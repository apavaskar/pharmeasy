package com.squer.sfe.common.service

import com.squer.platform.ServiceLocator
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.ApiDate
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.ApprovalChainInstance
import com.squer.sfe.common.entity.Employee
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*
import kotlin.reflect.full.createInstance

@Service
@Transactional
class ApprovalService {
    companion object {
        val heirarchy = mutableMapOf<String, Int>("jobrl00000000000000000000000000000001" to 1,
                                                  "jobrl00000000000000000000000000000002" to 2,
                                                  "jobrl00000000000000000000000000000003" to 3,
                                                  "jobrl00000000000000000000000000000004" to 4,
                                                  "jobrl00000000000000000000000000000005" to 5,
                                                  "jobrl10000000000000000000000000000001" to 99)
    }
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var employeeService: EmployeeService

    @Autowired
    lateinit var serviceLocator: ServiceLocator

    fun createChain(employeeId: String, type: String, ownerObjectId: String): List<ApprovalChainInstance> {
        val employee = employeeService.findById(employeeId)
        val myManagers = employeeService.getManagerForLocation((employee.profiles?.get(0))?.location!!.id).toMutableList()
        var i = 1
        val apiDate = ApiDate(Date())
        var chains = mutableListOf<ApprovalChainInstance>()
        var mis = mutableMapOf<String, String>()
        mis["emply_id"] = "emply12000000000000000000000000000000"
        mis["jobrl_id"] = "jobrl10000000000000000000000000000001"
        myManagers.add(mis)
        myManagers.forEach { manager ->
            if (type == "EXPENSE" && (manager.get("emply_id") as String == "emply0000000002fe992bc016b85278418005" ||
                manager.get("emply_id") as String == "emply000000036cc1d5b0179f667e92a042e2")) {
            } else if (type == "report-lock") {
                if (manager.get("jobrl_id") == "jobrl00000000000000000000000000000003") {
                    val jobRole = manager.get("jobrl_id")
                    val chain = ApprovalChainInstance()
                    chain.chainType = type
                    chain.approverLevel = heirarchy.get(jobRole)!!
                    chain.approver = NamedSquerId(manager.get("emply_id") as String, "")
                    chain.jobTitle = NamedSquerId(manager.get("jobrl_id") as String, "")
                    chain.approvalStatus = "SUBMITTED"
                    chain.receivedOn = Date()
                    chain.actionOn = null
                    chain.yyyyMm = apiDate.yYY_MM
                    chain.yyyyMmDd = apiDate.yYYY_MM_DD
                    chain.owner = SquerId(ownerObjectId)
                    chains.add(repository.create(chain) as ApprovalChainInstance)
                    i += 1
                }
            }else {
                val jobRole = manager.get("jobrl_id")
                if(heirarchy.containsKey(jobRole)) {
                    val chain = ApprovalChainInstance()
                    chain.chainType = type
                    chain.approverLevel = heirarchy.get(jobRole)!!
                    chain.jobTitle = NamedSquerId(manager.get("jobrl_id") as String, "")
                    chain.approver = NamedSquerId(manager.get("emply_id") as String, "")
                    chain.approvalStatus = "SUBMITTED"
                    chain.receivedOn = Date()
                    chain.actionOn = null
                    chain.yyyyMm = apiDate.yYY_MM
                    chain.yyyyMmDd = apiDate.yYYY_MM_DD
                    chain.owner = SquerId(ownerObjectId)
                    chains.add(repository.create(chain) as ApprovalChainInstance)
                    i += 1
                }
            }
        }
        return chains
    }


    fun approveReject(id: String, employee: Employee, action: String, comments: String?): Boolean {
        val approvalInstance = repository.restore(SquerId(id)) as ApprovalChainInstance
        approvalInstance.approvalStatus = if (action == "approve") "APPROVED" else "REJECTED"
        approvalInstance.actionOn = Date()
        approvalInstance.approver = NamedSquerId(employee.id!!.id, "")
        repository.update(approvalInstance)
        return false
    }

    fun getApprovals(employeeId: String, yearMonth: Int, type: String): List<Map<String, Any>> {
        val criteria = SearchCriteria(CommonQueryName.APPROVAL_CHAIN_BY_TYPE_SELECT.query)
        criteria.addCondition("employeeId", employeeId)
        criteria.addCondition("yearMonth", yearMonth)
        return repository.find(criteria).filterIsInstance<Map<String, Any>>()
    }
}