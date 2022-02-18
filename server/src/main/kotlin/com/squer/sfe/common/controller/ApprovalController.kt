package com.squer.sfe.common.controller

import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.ApiDate
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.controller.dto.ApprovalListItemDTO
import com.squer.sfe.common.controller.dto.ApprovalObjectDTO
import com.squer.sfe.common.entity.ApprovalChainInstance
import com.squer.sfe.common.entity.Employee
import com.squer.sfe.common.entity.EmployeeProfile
import com.squer.sfe.common.service.ApprovalService
import com.squer.sfe.common.service.EmployeeProfileService
import com.squer.sfe.common.service.EmployeeService
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.controller.dto.HospitalApprovalDTO
import com.squer.sfe.reporting.controller.enum.HospitalRcpaStatusEnum
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/approvals")
class ApprovalController {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var employeeProfileService: EmployeeProfileService

    @Autowired
    lateinit var approvalService: ApprovalService

    @Autowired
    lateinit var employeeService: EmployeeService

    @GetMapping("/{managerId}")
    fun getApprovalInstances(@PathVariable managerId: String,@RequestParam status: String = "all"): List<Any> {
        val profile = employeeProfileService.getProfile(managerId)[0] as EmployeeProfile
        val criteria = SearchCriteria(CommonQueryName.APPROVAL_CHAIN_SELECT.query)
        var mapOfData = mutableMapOf<String, MutableList<ApprovalObjectDTO>>()

        criteria.addCondition("aprci_approver_id", managerId)
        criteria.addCondition("aprci_chain_type","<>","EXPENSE")
        if (status != "all") {
            criteria.addCondition("aprci_approval_status", status)
        }
        val chainInstances = repository.find(criteria).filterIsInstance<ApprovalChainInstance>()
        var approvals = mutableListOf<ApprovalListItemDTO>()
        chainInstances.forEach {
            val type = it.chainType
            var listForType = mutableListOf<ApprovalObjectDTO>()
            if (mapOfData.containsKey(type)){
                listForType = mapOfData[type]!!
            }
            var dto = ApprovalObjectDTO()
            dto.instanceId = it.id!!.id
            dto.obj = repository.restore(it.owner)!!
            listForType.add(dto)
            mapOfData[type] = listForType
        }

        var searchCriteria = SearchCriteria(ReportingQueryName.HOSPITAL_STATUS_SELECT.query)
        searchCriteria.addCondition("locationId",profile.location!!.id)
        searchCriteria.addCondition("statusId", HospitalRcpaStatusEnum.SUBMITTED.status.id)
        repository.find(searchCriteria).filterIsInstance<HospitalApprovalDTO>().forEach {
            var listForType = mutableListOf<ApprovalObjectDTO>()
            if (mapOfData.containsKey("emrok_format")) {
                listForType = mapOfData["emrok_format"]!!
            }
            var dto = ApprovalObjectDTO()
            dto.instanceId = it.entityId!!
            dto.obj = it
            listForType.add(dto)
            mapOfData["emrok_format"] = listForType
        }

        mapOfData.forEach { key, value ->
            var dto = ApprovalListItemDTO()
            dto.title = key
            dto.data = value
            approvals.add(dto)
        }

        return approvals
    }

    @GetMapping("/{employeeId}/{yearMonth}")
    fun getApprovals(@PathVariable employeeId: String, @PathVariable yearMonth: Int, @RequestParam type: String = "all"): List<Map<String, Any>> {
        val criteria = mutableMapOf<String, String>()
        criteria.put("emply_person_code", employeeId)
        val employees = employeeService.findByParams(criteria).filterIsInstance<Employee>();
        if (employees.isEmpty()) return mutableListOf()
        return approvalService.getApprovals(employees.get(0).id!!.id, yearMonth, type)

    }
}