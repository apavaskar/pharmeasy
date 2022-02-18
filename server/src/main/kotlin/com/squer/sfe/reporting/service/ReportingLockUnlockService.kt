package com.squer.sfe.reporting.service

import com.squer.platform.ServiceLocator
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import com.squer.platform.config.ConfigQueryName
import com.squer.platform.config.entity.Configurations
import com.squer.platform.config.entity.enum.ConfigTypeEnum
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.ApiDate
import com.squer.platform.services.exception.ExceptionCode
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.SfeExceptionCode
import com.squer.sfe.common.entity.ApprovalChainInstance
import com.squer.sfe.common.entity.Employee
import com.squer.sfe.common.entity.EmployeeProfile
import com.squer.sfe.common.service.ApprovalImplementation
import com.squer.sfe.common.service.ApprovalService
import com.squer.sfe.common.service.EmployeeProfileService
import com.squer.sfe.common.service.EmployeeService
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.ReportingUnlockHistory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*


@Service
@Transactional
class ReportingLockUnlockService: ApprovalImplementation {
    companion object{
        val configName = NamedSquerId("syslvrcpa0000000000000000000000000002", "report-lock")
    }
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var approvalService: ApprovalService

    @Autowired
    lateinit var serviceLocator: ServiceLocator

    @Autowired
    lateinit var employeeService: EmployeeService

    fun  createRequest(employeeId: String, fromDate: ApiDate, toDate: ApiDate ): ReportingUnlockHistory {

        var configSearch = SearchCriteria(ReportingQueryName.RPTUH_SELECT.query)
        configSearch.addCondition("rptuh_employee_id", employeeId)
        configSearch.addCondition("rptuh_from_date_yyyy_mm_dd", fromDate.yYYY_MM_DD)
        configSearch.addCondition("rptuh_to_date_yyyy_mm_dd", toDate.yYYY_MM_DD)
        val existingConfigs = repository.find(configSearch)
        if(existingConfigs.isNotEmpty()) {
            throw SquerException(SfeExceptionCode.UNLOCK_REQUEST_EXISTS, "Unlock request already exists",
                null)
        }

        val unlockHistory = ReportingUnlockHistory()
        unlockHistory.employee = NamedSquerId(employeeId,"")
        unlockHistory.fromDate = fromDate.date!!
        unlockHistory.fromDateYyyyMm = fromDate.yYY_MM
        unlockHistory.fromDateYyyyMmDd = fromDate.yYYY_MM_DD
        unlockHistory.toDate = toDate.date!!
        unlockHistory.toDateYyyyMm = toDate.yYY_MM
        unlockHistory.toDateYyyyMmDd = toDate.yYYY_MM_DD
        unlockHistory.status = "SUBMITTED"
        val history = repository.create(unlockHistory) as ReportingUnlockHistory

        approvalService.createChain(employeeId, configName.name!!, history.id!!.id )

        return unlockHistory
    }

    override fun approveReject(id: String, approvalChainInstanceId: String, action: String, comments: String?) : Boolean{
        var mapOfParams = mutableMapOf<String, Any>("emply_user_id" to serviceLocator.getPrincipal()!!.id )
        val employee = employeeService.findByParams(mapOfParams).filterIsInstance<Employee>().get(0)
        val history = repository.restore(SquerId(id)) as ReportingUnlockHistory
        history.unlockedOn = Date()
        history.unlockedBy = employee.id!!
        if (action == "approve") {
            history.status = "APPROVED"
        }  else {
            history.status = "REJECTED"
        }
        repository.update(history)
        approvalService.approveReject(approvalChainInstanceId, employee, action, comments)
        return true
    }


}