package com.squer.scheduledJob.custom.wockhardt.job

import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.scheduledJob.custom.wockhardt.entity.SalaryBlockingEntries
import com.squer.scheduledJob.custom.wockhardt.service.ScheduledJobImpl
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Employee
import com.squer.sfe.reporting.controller.ReportingActivityTypeEnum
import com.squer.sfe.reporting.service.DailyVisitAttendeeService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.sql.Connection
import java.sql.DriverManager
import java.sql.SQLException
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.*

@Component("SalaryBlockingJob")
class SalaryBlockingJob: ScheduledJobImpl {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var dailyVisitAttendeeService: DailyVisitAttendeeService

    @Value("\${application.config.sqlServerUserName}")
    lateinit var sqlServerUserName: String

    @Value("\${application.config.sqlServerPassword}")
    lateinit var sqlServerPassword: String

    @Value("\${application.config.sqlServerURL}")
    lateinit var sqlServerURL: String

    @Value("\${application.config.sqlServerDriver}")
    lateinit var sqlServerDriver: String

    override fun start(parameterMap: MutableMap<String, Any>) {
        var calendar = Calendar.getInstance()
        //calendar.time = Date()
        calendar.set(2021,11,20)
        var toDate = calendar.time
        calendar.add(Calendar.DATE,-30)
        var fromDate = calendar.time
        var yyyyMMDDFormat: DateFormat = SimpleDateFormat("yyyyMMdd")

        //select all employees
        var searchCriteriaEmployees = SearchCriteria(CommonQueryName.EMPLOYEE_PROFILE_SELECT.query)
        searchCriteriaEmployees.addCondition("emprf_is_active",true);
        searchCriteriaEmployees.addCondition("emprf_is_default",true);
        var employeeList = repository.find(searchCriteriaEmployees).filterIsInstance<Employee>()

        // select all holidays
        var searchCriteriaHolidays = SearchCriteria(CommonQueryName.HOLIDAYS_BY_STATE_SELECT.query)
        searchCriteriaHolidays.addCondition("fromDate", yyyyMMDDFormat.format(fromDate).toInt())
        searchCriteriaHolidays.addCondition("toDate", yyyyMMDDFormat.format(toDate).toInt())
        var holidayDateMap = repository.find(searchCriteriaHolidays).filterIsInstance<Map<String, Any>>().groupBy ({it["state_id"] as String}, {it["holiday_date"] as Int})

        // location wise state
        var searchCriteriaLocState = SearchCriteria(CommonQueryName.LOCATION_WISE_STATE_SELECT.query)
        var locationStateMap = repository.find(searchCriteriaLocState).filterIsInstance<Map<String, Any>>().associateBy ({it["locat_id"] as String},{it["state_id"] as String})

        employeeList.forEach { emp ->
            var salaryBlockingEntries =  SalaryBlockingEntries()
            salaryBlockingEntries.jobDate = yyyyMMDDFormat.format(toDate).toInt()
            salaryBlockingEntries.employee = NamedSquerId(emp.id!!.id,"")
            salaryBlockingEntries.location = NamedSquerId(emp.profiles!![0].location!!.id,"")
            salaryBlockingEntries.jobRole = NamedSquerId(emp.profiles!![0].jobRole!!.id,"")
            var saveEntry = false

            var missedCount = 0
            var leaveCount = 0
            var missedFrom = 0
            var missedTo = 0
            var leaveFrom = 0
            var leaveTo = 0

            var tmpFromDate = fromDate

            var attendeeDateMap = dailyVisitAttendeeService.getAttendeesForPeriodByEmployee(emp.profiles!![0].location!!.id, yyyyMMDDFormat.format(fromDate).toInt(),yyyyMMDDFormat.format(toDate).toInt(),true,false).groupBy ({it.yyyyMmDd}, {it.activityType!!.id})
            while (tmpFromDate <= toDate){
                var cal = Calendar.getInstance()
                cal.time = tmpFromDate

                if(emp.dateOfJoining!! <= tmpFromDate) {
                    if (attendeeDateMap.containsKey(yyyyMMDDFormat.format(tmpFromDate).toInt())) {
                        var activityTypeList = attendeeDateMap[yyyyMMDDFormat.format(tmpFromDate).toInt()]
                        if (activityTypeList!!.contains(ReportingActivityTypeEnum.LEAVE.type.id)) {
                            leaveCount += 1
                            if (leaveFrom == 0)
                                leaveFrom = yyyyMMDDFormat.format(tmpFromDate).toInt()
                            else
                                leaveTo = yyyyMMDDFormat.format(tmpFromDate).toInt()

                        } else {
                            leaveCount = 0
                            leaveFrom = 0
                            leaveTo = 0
                        }
                        missedCount = 0
                        missedFrom = 0
                        missedTo = 0
                    } else {
                        if(checkHoliday(holidayDateMap,locationStateMap,yyyyMMDDFormat.format(tmpFromDate).toInt(),emp.profiles!![0].location!!.id)
                            || calendar.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY
                        ) {
                            missedCount = 0
                            missedFrom = 0
                            missedTo = 0
                        }
                        else {
                            missedCount += 1
                            if (missedFrom == 0)
                                missedFrom = yyyyMMDDFormat.format(tmpFromDate).toInt()
                            else
                                missedTo = yyyyMMDDFormat.format(tmpFromDate).toInt()
                        }
                    }
                }
                cal.add(Calendar.DATE,1)
                tmpFromDate = cal.time

                if(missedCount >=5){
                    salaryBlockingEntries.missedFromDate = missedFrom
                    salaryBlockingEntries.missedToDate = missedTo
                    salaryBlockingEntries.missedDays = missedCount
                    saveEntry = true
                }
            }
            if(saveEntry)
                repository.create(salaryBlockingEntries)
        }
        pushToSqlServer()
    }

    fun pushToSqlServer(){
        var conn: Connection? = null
        try {


            Class.forName(sqlServerDriver)
            conn = DriverManager.getConnection(sqlServerURL)
            val st = conn.createStatement()
            val deletesql = "DELETE FROM SFE_BlockedUsers WHERE CAST(TIMESTAMP AS DATE)>=CAST(GETDATE() AS DATE)"
            println(deletesql)
            val dcnt = st.executeUpdate(deletesql)
            println("NUMBER OF ENTRIES DELETED = $dcnt")
            var cnt = 0
            var listCount = 0

            var searchCriteria = SearchCriteria(CommonQueryName.BLOCKING_ENTRIES_SELECT.query)
            var mapList = repository.find(searchCriteria).filterIsInstance<Map<String,Any>>()
            println(mapList.size)

            mapList.forEach {
                val insertSql =
                    "INSERT INTO SFE_BlockedUsers (EMPID, DIVISION, ZONE, TIMESTAMP) VALUES ('" + it["emply_person_code"].toString() + "','" + it["divsn_name"].toString() + "','" + it["zone_nm"].toString() + "','" + SimpleDateFormat(
                        "yyyy-MM-dd HH:mm:ss"
                    ).format(
                        Date()
                    ) + "')"
                println(insertSql)
                st.addBatch(insertSql)
                st.executeBatch()
                st.clearBatch()
                cnt++
                listCount++
                if (cnt == 1000 || mapList.size == listCount) {
                    st.executeBatch()
                    cnt = 0
                    st.clearBatch()
                }
            }
            val rs = st.executeQuery("SELECT count(*) AS rowcounts FROM SFE_BlockedUsers")
            rs.next()
            println("**************" + rs.getInt("rowcounts"))
            println("Records Saved Successfully")
        } catch (e: Exception) {
            e.printStackTrace()
        } finally {
            try {
                conn!!.close()
            } catch (e: SQLException) {
                e.printStackTrace()
            }
        }
    }

    fun checkHoliday(holidayMap: Map<String, List<Int>> , locStateMap: Map<String, String> , yyyyMmDd: Int, locationId:String): Boolean{
        return if(holidayMap.containsKey(locStateMap[locationId])){
            var holidayDates = holidayMap[locStateMap[locationId]]
            holidayDates!!.contains(yyyyMmDd)
        } else false
    }

    override fun end(parameterMap: MutableMap<String, Any>) {
    }

    override fun error(parameterMap: MutableMap<String, Any>) {
    }
}