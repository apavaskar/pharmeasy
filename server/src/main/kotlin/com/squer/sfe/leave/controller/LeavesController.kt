package com.squer.sfe.leave.controller

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.leave.entity.Leaves
import com.squer.sfe.leave.service.LeavesService
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.ApiDate
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.service.EmployeeService
import com.squer.sfe.leave.LeaveQueryName
import com.squer.sfe.leave.controller.dto.EmployeeLeaveDTO
import com.squer.sfe.leave.controller.dto.LeaveBalanceListDTO
import com.squer.sfe.leave.controller.dto.LeaveDTO
import com.squer.sfe.leave.controller.dto.LeaveDetailsDTO
import com.squer.sfe.leave.controller.enum.LeaveStatusEnum
import com.squer.sfe.leave.entity.LeaveBalance
import com.squer.sfe.leave.service.LeaveBalanceService
import com.squer.sfe.reporting.controller.dto.AttendeeDTO
import com.squer.sfe.reporting.service.DailyVisitAttendeeService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.text.SimpleDateFormat
import java.util.*
import kotlin.jvm.Throws
import kotlin.math.roundToInt

@RequestMapping("/leaves")
@RestController
class LeavesController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: LeavesService

    @Autowired
    lateinit var leaveBalanceService: LeaveBalanceService

    @Autowired
    lateinit var employeeService: EmployeeService

    @Autowired
    lateinit var dailyVisitAttendeeService: DailyVisitAttendeeService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Leaves {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: Leaves): Leaves {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Leaves): Leaves {
        return entityService.update(entity)
    }


    @Throws(SquerException::class)
    @GetMapping("/by-employee/{employeeId}/{yearMonthDd}")
    fun getMyLeaves(@PathVariable employeeId: String,
                    @PathVariable yearMonthDd: Int): List<LeaveDTO> {
        val dateFormat = SimpleDateFormat("yyyyMMdd")
        var calender = Calendar.getInstance()
        calender.time = ApiDate(yearMonthDd).date

        calender.set(Calendar.DATE,calender.getActualMinimum(Calendar.DATE))
        var fromDate = calender.time
        calender.set(Calendar.DATE, calender.getActualMaximum(Calendar.DATE))
        var toDate = calender.time

        var searchCriteria = SearchCriteria(LeaveQueryName.LEAVE_FOR_EMPLOYEE_SELECT.query)
        searchCriteria.addCondition("employeeId",employeeId)
        searchCriteria.addCondition("fromDate", dateFormat.format(fromDate).toInt())
        searchCriteria.addCondition("toDate", dateFormat.format(toDate).toInt())
        var leaveList = repository.find(searchCriteria).filterIsInstance<Leaves>()
        var leaveDTOList = mutableListOf<LeaveDTO>()

        leaveList.forEach{
            leaveDTOList.add(
                LeaveDTO(it.id!!.id,it.owner,it.fromDate,it.toDate,it.leaveType,it.actualLeavesDays, it.reason, it.status)
            )
        }
        return leaveDTOList
    }


    @Throws(SquerException::class)
    @PutMapping("/createLeave")
    fun createLeave(@RequestBody leaveDTO: LeaveDTO): List<AttendeeDTO> {
        try {
            var leaveRollOverMap = mutableMapOf<String,List<String>>()
            leaveRollOverMap.put("syslv00000000000000000000000000000040", listOf("syslv00000000000000000000000000000040","syslv00000000000000000000000000000041","syslv00000000000000000000000000000042","syslv00000000000000000000000000000191"))
            leaveRollOverMap.put("syslv00000000000000000000000000000041", listOf("syslv00000000000000000000000000000041","syslv00000000000000000000000000000040","syslv00000000000000000000000000000042","syslv00000000000000000000000000000191"))
            leaveRollOverMap.put("syslv00000000000000000000000000000042",listOf("syslv00000000000000000000000000000042","syslv00000000000000000000000000000191"))
            leaveRollOverMap.put("syslv00000000000000000000000000000191",listOf("syslv00000000000000000000000000000191"))

            var leaveBalances = leaveBalanceService.getLeaveBalance(leaveDTO.employeeId!!.id, "", leaveDTO.fromDate!!, leaveDTO.toDate!!, true)
            var leaveBalanceMap = mutableMapOf<String,LeaveBalance>()
            leaveBalances.forEach { leaveBalanceMap.put(it.leaveType!!.id ,it)}
            var leaveList = mutableListOf<Leaves>()

            if(leaveBalanceMap.containsKey(leaveDTO.leaveType!!.id)){
                var lb = leaveBalanceMap[leaveDTO.leaveType!!.id]
                var totalLeaveCount = leaveBalanceService.getActualLeaveDays(leaveDTO.fromDate!!, leaveDTO.toDate!!)
                if(leaveDTO.fromDate!! >= lb!!.validFrom!!   && lb!!.balance!! >= totalLeaveCount){
                    leaveList.add(mapToLeave(leaveDTO.employeeId!!,leaveDTO.leaveType!!,leaveDTO.fromDate!!, leaveDTO.toDate!!,totalLeaveCount,leaveDTO.reason!!,null))
                }else {
                    var leavesList = leaveRollOverMap[leaveDTO.leaveType!!.id]
                    var tempFrom = leaveDTO.fromDate
                    val dateFormat = SimpleDateFormat("yyyyMMdd")
                    var fromDate = dateFormat.parse(leaveDTO.fromDate.toString())
                    var tempToDate = dateFormat.parse(leaveDTO.fromDate.toString())
                    var toDate = dateFormat.parse(leaveDTO.toDate.toString())

                    leavesList!!.forEach{
                        if (fromDate > toDate){
                            return@forEach
                        }
                        if(leaveBalanceMap.containsKey(it)){
                            var lb = leaveBalanceMap[it]
                            if(lb!!.validFrom!! <= tempFrom!! && (lb.balance!! > 0 || it == "syslv00000000000000000000000000000191")){
                                var calendar = Calendar.getInstance()
                                calendar.time = fromDate
                                if(it=="syslv00000000000000000000000000000191")
                                    calendar.add(Calendar.DATE, totalLeaveCount-1)
                                else
                                    calendar.add(Calendar.DATE, minOf(lb.balance!!.roundToInt(),totalLeaveCount)-1)
                                tempToDate = calendar.time
                                var leaveCount = leaveBalanceService.getActualLeaveDays(dateFormat.format(fromDate).toInt(), dateFormat.format(tempToDate).toInt())
                                leaveList.add(mapToLeave(leaveDTO.employeeId!!, NamedSquerId(it,""), dateFormat.format(fromDate).toInt(), dateFormat.format(tempToDate).toInt(),leaveCount,leaveDTO.reason!!,leaveDTO.leaveType))
                                calendar.add(Calendar.DATE,1)
                                fromDate = calendar.time
                                totalLeaveCount -= leaveCount
                            }else {
                                return@forEach
                            }
                        }
                    }
                }
            }else{
                var totalLeaveCount = leaveBalanceService.getActualLeaveDays(leaveDTO.fromDate!!, leaveDTO.toDate!!)
                leaveList.add(mapToLeave(leaveDTO.employeeId!!, NamedSquerId("syslv00000000000000000000000000000191",""), leaveDTO.fromDate!!, leaveDTO.toDate!!,totalLeaveCount,leaveDTO.reason!!,leaveDTO.leaveType))
            }

            leaveList.forEach{
                entityService.create(it)
            }

            var employee = employeeService.findById(leaveDTO.employeeId!!.id)
            var attendeeList = dailyVisitAttendeeService.getAttendeesForPeriodByEmployee(employee.profiles!![0].location!!.id,leaveDTO.fromDate!!,leaveDTO.toDate!!,true,false)
            var attendeeDtoList = mutableListOf<AttendeeDTO>()

            attendeeList.forEach{
                attendeeDtoList.add(
                    AttendeeDTO(
                        it.id,
                        it.plan,
                        it.activityType,
                        it.activityTypeId,
                        it.customer,
                        it.yyyyMm,
                        it.yyyyMmDd,
                        it.location,
                        it.employee,
                        it.isPlanned,
                        it.isReported,
                        it.isJoint,
                        it.isRcpaDone,
                        it.isVideoShown,
                        it.visitType,
                        it.remarks,
                        it.isActive,
                        it.joineeReference,
                        mutableListOf(),mutableListOf(),mutableListOf(),mutableListOf(),mutableListOf(),mutableListOf()
                    )
                )
            }
            return attendeeDtoList
        }catch (e: Exception) {
            e.printStackTrace()
            throw e
        }
    }

    fun mapToLeave(employeeId: NamedSquerId, leaveType: NamedSquerId, fromDate: Int, toDate: Int, leaveDays: Int, reason: String, leaveAgainst: NamedSquerId?): Leaves {
        var leave = Leaves()
        leave.owner = employeeId
        leave.leaveType = leaveType
        leave.fromDate = fromDate
        leave.toDate = toDate
        leave.actualLeavesDays = leaveBalanceService.getActualLeaveDays(fromDate,toDate)
        leave.reason = reason
        leave.appliedAgainstType = leaveAgainst
        leave.actionBy = null
        leave.status = LeaveStatusEnum.LEAVE_APPLIED.status
        return leave
    }

    @Throws(SquerException::class)
    @GetMapping("/by-user/{employeeCode}/{year}")
    fun leaveDetailsByUser(@PathVariable employeeCode: String, @PathVariable year: Int): EmployeeLeaveDTO {
        var valueMap = mutableMapOf<String, Any>()
        valueMap.put("emply_person_code", employeeCode)
        var empList = employeeService.findByParams(valueMap)
        if (empList.isEmpty())
            throw Exception("Invalid User")

        var employee = empList[0]
        var searchCriteria = SearchCriteria(LeaveQueryName.LEAVE_DETAILS_FOR_EMPLOYEE_SELECT.query)
        searchCriteria.addCondition("employeeCode", employeeCode)
        searchCriteria.addCondition("year", year)
        var leaveList = repository.find(searchCriteria).filterIsInstance<LeaveDetailsDTO>()

        val dateFormat = SimpleDateFormat("yyyyMMdd")
        var balanceList = leaveBalanceService.getLeaveBalance(employee.id!!.id, "", dateFormat.format(Date()).toInt(), dateFormat.format(Date()).toInt(), false)
        var balanceDTOList = mutableListOf<LeaveBalanceListDTO>()
        balanceList.forEach {
            balanceDTOList.add(LeaveBalanceListDTO(it.leaveType, it.opening, it.consumed, it.balance, it.adjusted))
        }
        return EmployeeLeaveDTO(leaveList, balanceDTOList)
    }


}