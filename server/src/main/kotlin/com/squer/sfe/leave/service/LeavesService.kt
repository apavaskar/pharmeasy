package com.squer.sfe.leave.service

import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import com.squer.sfe.leave.LeaveQueryName
import com.squer.sfe.leave.entity.Leaves
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.SfeExceptionCode
import com.squer.sfe.common.service.ApprovalService
import com.squer.sfe.common.service.EmployeeService
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.controller.MonthlyPlanController
import com.squer.sfe.reporting.controller.ReportingActivityTypeEnum
import com.squer.sfe.reporting.entity.DailyVisitAttendee
import com.squer.sfe.reporting.service.DailyVisitAttendeeService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.*
import kotlin.jvm.Throws

@Transactional
@Service
class LeavesService {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var employeeService: EmployeeService

    @Autowired
    lateinit var monthlyPlanController: MonthlyPlanController

    @Autowired
    lateinit var dailyVisitAttendeeService: DailyVisitAttendeeService

    @Autowired
    lateinit var approvalService: ApprovalService

    @Autowired
    lateinit var leaveBalanceService: LeaveBalanceService

    fun findById(id: String): Leaves {
        val searchCriteria = SearchCriteria(LeaveQueryName.LEAVE_SELECT.query)
        searchCriteria.addCondition("leave_id", id)
        return repository.find(searchCriteria).filterIsInstance<Leaves>().first()
    }

    @Throws(SquerException::class)
    fun create(entity: Leaves): Leaves {
        var yyyyMMDDFormat: DateFormat = SimpleDateFormat("yyyyMMdd")
        var yyyyMMFormat: DateFormat = SimpleDateFormat("yyyyMM")
        var fromDate = yyyyMMDDFormat.parse(entity.fromDate.toString())
        var toDate = yyyyMMDDFormat.parse(entity.toDate.toString())

        val valueMap = mutableMapOf<String, Any>()
        valueMap["emply_id"] = entity.owner!!.id
        valueMap["emprf_is_active"] = true
        valueMap["emprf_is_default"] = true
        var employee = employeeService.getProfile(valueMap)

        // check visit is exists
        var attendeeList = dailyVisitAttendeeService.getAttendeesForPeriodByEmployee(employee.profiles!![0].location!!.id,entity.fromDate!!,entity.toDate!!,true,false)
        if(attendeeList.isNotEmpty())
            throw SquerException(SfeExceptionCode.VISIT_ALREADY_EXISTS,SfeExceptionCode.VISIT_ALREADY_EXISTS.toString(),null)

        var leave = repository.create(entity) as Leaves

        while (fromDate <= toDate){
            // check plan
            var monthlyPlanDto = monthlyPlanController.createPlanForUser(employee.profiles!![0].location!!.id, yyyyMMFormat.format(fromDate).toInt())

            //create attendee
            var dailyVisitAttendee= DailyVisitAttendee()
            dailyVisitAttendee.plan = monthlyPlanDto.plan
            dailyVisitAttendee.customer = null
            dailyVisitAttendee.activityType = ReportingActivityTypeEnum.LEAVE.type
            dailyVisitAttendee.activityTypeId = leave.id
            dailyVisitAttendee.duration = 1.0
            dailyVisitAttendee.yyyyMm = yyyyMMFormat.format(fromDate).toInt()
            dailyVisitAttendee.yyyyMmDd = yyyyMMDDFormat.format(fromDate).toInt()
            dailyVisitAttendee.location = employee.profiles!![0].location
            dailyVisitAttendee.employee = entity.owner
            dailyVisitAttendee.isPlanned = false
            dailyVisitAttendee.isReported = true
            dailyVisitAttendee.isJoint = false
            dailyVisitAttendee.isRcpaDone = false
            dailyVisitAttendee.isVideoShown = false
            dailyVisitAttendee.visitType = null
            dailyVisitAttendee.remarks = null
            dailyVisitAttendee.isActive = true
            dailyVisitAttendee.joineeReference = null
            dailyVisitAttendeeService.create(dailyVisitAttendee)

            var calender = Calendar.getInstance()
            calender.time = fromDate
            calender.add(Calendar.DATE,1)
            fromDate = calender.time
        }

        //update balance
        var leaveBalances = leaveBalanceService.getLeaveBalance(leave.owner!!.id, leave.leaveType!!.id, leave.fromDate!!, leave.toDate!!, true)
        var leaveBalance = leaveBalances[0]
        leaveBalance.consumed = leaveBalance.consumed!! + leave.actualLeavesDays!!
        leaveBalance.balance = leaveBalance.opening!! - leaveBalance.consumed!!
        repository.update(leaveBalance)

        approvalService.createChain(entity.owner!!.id, "LEAVE", leave.id!!.id )

        return leave
    }

    fun update(entity: Leaves): Leaves {
        return repository.update(entity) as Leaves
    }

    fun findByParams(valueMap: Map<String,Any>): List<Leaves> {
            val searchCriteria = SearchCriteria(LeaveQueryName.LEAVE_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<Leaves>()
    }


}