package com.squer.sfe.leave.service

import com.squer.sfe.leave.LeaveQueryName
import com.squer.sfe.leave.entity.LeaveBalance
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.text.SimpleDateFormat
import kotlin.time.Duration

@Service
class LeaveBalanceService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): LeaveBalance {
        val searchCriteria = SearchCriteria(LeaveQueryName.LVBLC_SELECT.query)
        searchCriteria.addCondition("lvblc_id", id)
        return repository.find(searchCriteria).filterIsInstance<LeaveBalance>().first()
    }

    fun create(entity: LeaveBalance): LeaveBalance {
        return repository.create(entity) as LeaveBalance
    }

    fun update(entity: LeaveBalance): LeaveBalance {
        return repository.update(entity) as LeaveBalance
    }

    fun findByParams(valueMap: Map<String,Any>): List<LeaveBalance> {
            val searchCriteria = SearchCriteria(LeaveQueryName.LVBLC_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<LeaveBalance>()
    }

    fun getActualLeaveDays(fromDate: Int, toDate: Int): Int {
        val dateFormat = SimpleDateFormat("yyyyMMdd")
        var fDate = dateFormat.parse(fromDate.toString())
        var tDate = dateFormat.parse(toDate.toString())
        return java.time.Duration.between(fDate.toInstant() ,tDate.toInstant()).toDays().toInt() + 1
    }

    fun getLeaveBalance(employeeId: String, leaveType: String, fromDate: Int, toDate: Int, checkValidFrom: Boolean): List<LeaveBalance> {
        val searchCriteria = SearchCriteria(LeaveQueryName.LEAVE_BALANCE_FOR_EMPLOYEE_SELECT.query)
        searchCriteria.addCondition("employeeId", employeeId)
        searchCriteria.addCondition("fromDate",fromDate)
        searchCriteria.addCondition("toDate",toDate)
        if(checkValidFrom)
            searchCriteria.addCondition("checkValidFrom",checkValidFrom)

        if(leaveType!="")
            searchCriteria.addCondition("leaveType",leaveType)

        return repository.find(searchCriteria).filterIsInstance<LeaveBalance>()
    }
}