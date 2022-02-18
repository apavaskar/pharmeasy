package com.squer.sfe.reporting.controller

import com.squer.platform.config.entity.Configurations
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.ApiDate
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.ReportingUnlockHistory
import com.squer.sfe.reporting.service.ReportingLockUnlockService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.util.*
import kotlin.jvm.Throws

@RequestMapping("/report-unlock")
@RestController
class ReportingLockUnlockController {

    @Autowired
    lateinit var reportingLockUnlockService: ReportingLockUnlockService

    @Autowired
    lateinit var repository: SquerRepository

    @Throws(SquerException::class)
    @PostMapping("/request/{employeeId}/{fromDate}/{toDate}")
    fun requestUnlock(@PathVariable employeeId: String,
                      @PathVariable fromDate: Int,
                      @PathVariable toDate: Int): ReportingUnlockHistory {
        return  reportingLockUnlockService.createRequest(employeeId, ApiDate(fromDate), ApiDate(toDate))
    }

    @Throws(SquerException::class)
    @PutMapping("/{action}/{id}/{approvalId}")
    fun approveReject(@PathVariable id: String, @PathVariable approvalId: String, @PathVariable action: String, @RequestBody comments: String?) : Boolean {
        return reportingLockUnlockService.approveReject(id, approvalId, action, comments)
    }

    @Throws(SquerException::class)
    @GetMapping("/active-requests/{employeeId}")
    fun getRequests(@PathVariable employeeId: String): List<ReportingUnlockHistory> {
        val today = Date()
        var criteria = SearchCriteria(ReportingQueryName.RPTUH_SELECT.query)
        criteria.addCondition("rptuh_employee_id", employeeId)
        criteria.addCondition("(RPTUH_UNLOCKED_ON_YYYY_MM_DD + interval '2' day)", ">=", today)
        criteria.addCondition("rptuh_status", "APPROVED")
        return repository.find(criteria).filterIsInstance<ReportingUnlockHistory>()
    }

    @Throws(SquerException::class)
    @PutMapping("/for-user/{employeeCode}")
    fun approveRequestForUser(@PathVariable employeeCode: String): Boolean {
        try {
            var mapOfConditions = mutableMapOf<String, Any>()
            mapOfConditions.put("employeeCode", employeeCode)
            repository.fireAdhoc(ReportingQueryName.REPROTING_UNLOCK_FOR_USER.query, mapOfConditions)
            return true
        }catch (e:Exception){
            e.printStackTrace()
            return false
        }
    }
}