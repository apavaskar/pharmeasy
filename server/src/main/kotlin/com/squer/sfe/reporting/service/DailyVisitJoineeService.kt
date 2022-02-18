package com.squer.sfe.reporting.service

import com.squer.platform.ServiceLocator
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.DailyVisitJoinee
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.service.EmployeeService
import com.squer.sfe.reporting.ReportTypeEnum
import com.squer.sfe.reporting.controller.ReportingActivityTypeEnum
import com.squer.sfe.reporting.controller.dto.syncing.SyncingVisitDTO
import com.squer.sfe.reporting.controller.enum.JoineeStatusEnum
import com.squer.sfe.reporting.entity.DailyVisitAttendee
import com.squer.sfe.reporting.entity.MonthlyPlan
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.text.SimpleDateFormat
import java.util.*
@Transactional
@Service
class DailyVisitJoineeService {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var serviceLocator: ServiceLocator

    @Autowired
    lateinit var employeeService: EmployeeService

    @Autowired
    lateinit var monthlyPlanService: MonthlyPlanService

    @Autowired
    lateinit var mobileSyncingService: MobileSyncingService

    fun findById(id: String): DailyVisitJoinee {
        val searchCriteria = SearchCriteria(ReportingQueryName.DTVJE_SELECT.query)
        searchCriteria.addCondition("dtvje_id", id)
        return repository.find(searchCriteria).filterIsInstance<DailyVisitJoinee>().first()
    }

    fun create(entity: DailyVisitJoinee): DailyVisitJoinee {
        return repository.create(entity) as DailyVisitJoinee
    }

    fun update(entity: DailyVisitJoinee): DailyVisitJoinee {
        var isActive = true
        if(entity.status!!.id == JoineeStatusEnum.REJECTED.status.id)
            isActive = false

        markVisitForZSM(entity.attendee!!.id,isActive)
        return repository.update(entity) as DailyVisitJoinee
    }

    fun findByParams(valueMap: Map<String,Any>): List<DailyVisitJoinee> {
            val searchCriteria = SearchCriteria(ReportingQueryName.DTVJE_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<DailyVisitJoinee>()
    }

    fun deactivateJoineeByAttendee(attendeeId: String): Boolean {
        try {
            var valueMap = mutableMapOf<String, Any>()
            valueMap.put("dtvje_attendee_id", attendeeId)
            var joineeList = findByParams(valueMap)
            joineeList.forEach{
                it.isActive=false
                repository.update(it)
            }
            return true
        }catch (e: Exception){
            throw Exception(e)
        }
    }

    fun deactivateJoineeById(joineeId: String): DailyVisitJoinee{
        try {
            var dailyVisitJoinee = findById(joineeId)
            dailyVisitJoinee.isActive=false
            return repository.update(dailyVisitJoinee) as DailyVisitJoinee
        }catch (e: Exception){
            throw Exception(e)
        }
    }

    fun markVisitForManager(managerId: String, customerId: String, statusId: String): Boolean {
        var searchCriteria = SearchCriteria(ReportingQueryName.MANAGER_JOINT_VISIT_BY_CUSTOMER_SELECT.query)
        searchCriteria.addCondition("customerId", customerId)
        searchCriteria.addCondition("managerId", managerId)
        var joineeList = repository.find(searchCriteria).filterIsInstance<DailyVisitJoinee>()
        joineeList.forEach {
            it.status = NamedSquerId(statusId,"")
            repository.update(it)
        }
        return true
    }

    fun markVisitForZSM(attendeeId: String, isActive: Boolean): Boolean{
        try {
            val valueMap = mutableMapOf<String, Any>()
            valueMap["emply_user_id"] = serviceLocator.getPrincipal()!!.id
            valueMap["emprf_is_active"] = true
            valueMap["emprf_is_default"] = true
            var employee = employeeService.getProfile(valueMap)
            if (employee.profiles!![0].jobRole!!.id == "jobrl00000000000000000000000000000003") {
                var dailyActivity = repository.restore(SquerId(attendeeId)) as DailyVisitAttendee
                var simpleDateFormat = SimpleDateFormat("yyyyMMdd")
                var calendar = Calendar.getInstance()
                calendar.time = simpleDateFormat.parse(dailyActivity.yyyyMmDd.toString())
                var monthlyPlan = MonthlyPlan()
                var planValeMap = mutableMapOf<String, Any>()
                planValeMap.put("mtpln_location_id", employee.profiles!!.get(0).location!!.id)
                planValeMap.put("mtpln_employee_id", employee.id!!.id)
                planValeMap.put("mtpln_year_month", dailyActivity.yyyyMm!!)
                var plans = monthlyPlanService.findByParams(planValeMap)
                if (!plans.isEmpty()) {
                    monthlyPlan = plans[0]
                } else {
                    monthlyPlan = monthlyPlanService.createPlan(
                        employee.id!!.id,
                        employee.profiles!!.get(0).location!!.id,
                        calendar.get(Calendar.YEAR),
                        dailyActivity.yyyyMm!!
                    )
                }

                var syncVisitDTO = SyncingVisitDTO()
                syncVisitDTO.attendeeId = null
                syncVisitDTO.customerId = dailyActivity.customer!!.id
                syncVisitDTO.activityType = ReportingActivityTypeEnum.CALL_ACTIVITY.type.id
                syncVisitDTO.activityTypeId = null
                syncVisitDTO.duration = 1.0
                syncVisitDTO.yyyyMmDd = dailyActivity.yyyyMmDd
                syncVisitDTO.locationId = monthlyPlan.location!!.id
                syncVisitDTO.employeeId = monthlyPlan.employee!!.id
                syncVisitDTO.isPlanned = false
                syncVisitDTO.isReported = isActive
                syncVisitDTO.isJoint = true
                syncVisitDTO.isRcpaDone = false
                syncVisitDTO.isVideoShown = false
                syncVisitDTO.visitTypeId = ReportTypeEnum.PHYSICAL_CALL.typeId
                syncVisitDTO.remarks = null
                syncVisitDTO.isActive = isActive
                syncVisitDTO.externalCode = "A"
                syncVisitDTO.joineeList = mutableListOf()
                syncVisitDTO.rcpaList = mutableListOf()
                syncVisitDTO.detailingList = mutableListOf()
                syncVisitDTO.digitalVisitData = mutableListOf()
                syncVisitDTO.inputsList = mutableListOf()
                syncVisitDTO.joineeReferenceId = dailyActivity.id!!.id
                syncVisitDTO.joineeMarkStatus = null
                mobileSyncingService.createAttendee(syncVisitDTO, dailyActivity.yyyyMm!!, monthlyPlan.id!!)
            }
            return true
        }catch (e: Exception){
            e.printStackTrace()
            throw e
        }
    }
}