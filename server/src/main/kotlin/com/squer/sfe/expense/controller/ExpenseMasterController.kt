package com.squer.sfe.expense.controller

import com.squer.sfe.expense.entity.ExpenseMaster
import com.squer.sfe.expense.service.ExpenseMasterService
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Location
import com.squer.sfe.common.entity.LocationType
import com.squer.sfe.expense.ExpenseQueryName
import com.squer.sfe.expense.dto.ExpenseMasterDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.util.*
import kotlin.jvm.Throws

@RequestMapping("/expensemaster")
@RestController
class ExpenseMasterController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: ExpenseMasterService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): ExpenseMaster {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PostMapping("/create")
    fun createEntity(@RequestBody entity: ExpenseMaster): ExpenseMaster {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: ExpenseMaster): ExpenseMaster {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/for-employee/{employeeId}/{yyyyMmDd}")
    fun getForEmployee(@PathVariable employeeId: String, @PathVariable yyyyMmDd: String): ExpenseMaster {
        return entityService.getExpenseForUser(employeeId,yyyyMmDd)
    }

    @PutMapping("/submit/{employeeId}/{yyyyMm}")
    fun submitExpenses(@PathVariable employeeId: String, @PathVariable yyyyMm: Int): Boolean {
        return entityService.submitExpense(employeeId, yyyyMm)
    }

    @PostMapping("/search")
    fun searchExpenses(@RequestBody conditions: Map<String, Any>): List<ExpenseMasterDTO> {
        var valueMap = mutableMapOf<String, Any>()
        if (conditions.containsKey("employeeId"))
            valueMap.put("expmt_employee_id", conditions.get("employeeId") as String)
        if (conditions.containsKey("yearMonth"))
            valueMap.put("expmt_yyyy_mm", (conditions.get("yearMonth") as String ).toInt())
        if (conditions.containsKey("divisionId")) {
            valueMap.put("locat_division_id", conditions.get("divisionId") as String)
        }
        var masters =  entityService.findByParams(valueMap).filterIsInstance<ExpenseMaster>()
        if (masters.isEmpty()) return  mutableListOf()

        if (conditions.containsKey("locationId")) {
            val searchCriteriaTeam = SearchCriteria(CommonQueryName.MY_TEAM_SELECT.query)
            searchCriteriaTeam.addCondition("locationId", conditions.get("locationId") as String)
            var teamMapList = repository.find(searchCriteriaTeam).filterIsInstance<Map<String, Any>>().map { it.get("emply_id") }
            masters = masters.filter { teamMapList.contains(it.employee!!.id) }
        }

        var claimsCriteria = SearchCriteria(ExpenseQueryName.EXPENSE_CLAIMED_AMOUNT.query)
        if (conditions.containsKey("employeeId"))
            claimsCriteria.addCondition("expdt_employee_id", conditions.get("employeeId") as String)
        if (conditions.containsKey("yearMonth"))
            claimsCriteria.addCondition("expdt_yyyy_mm", (conditions.get("yearMonth") as String ).toInt())
        val amounts = repository.find(claimsCriteria).filterIsInstance<Map<String, Any>>().associateBy ( {it.get("expdt_expense_id")}, {it})

        var approvedCriteria = SearchCriteria(ExpenseQueryName.EXPENSE_APPROVED_SELECT.query)
        if (conditions.containsKey("employeeId"))
            approvedCriteria.addCondition("expmt_employee_id", conditions.get("employeeId") as String)
        if (conditions.containsKey("yearMonth"))
            approvedCriteria.addCondition("expmt_yyyy_mm", (conditions.get("yearMonth") as String ).toInt())
        if (conditions.containsKey("divisionId"))
            approvedCriteria.addCondition("locat_division_id", conditions.get("divisionId") as String)
        approvedCriteria.addCondition("expaa_manager_id","emply12000000000000000000000000000000")
        val approvedAmounts = repository.find(approvedCriteria).filterIsInstance<Map<String, Any>>().associateBy ( {it.get("expaa_expense_id")}, {it})

        val locationsCriteria = SearchCriteria(CommonQueryName.LOCAT_SELECT.query)
        locationsCriteria.addCondition("locat_is_active", true)
        val locationsMap = repository.find(locationsCriteria).filterIsInstance<Location>().associateBy ({it.id!!.id}, {it})


        var dtos = mutableListOf<ExpenseMasterDTO>()
        for (master in masters) {
            val dto = ExpenseMasterDTO()
            dto.division = locationsMap[master.location!!.id]!!.division!!.name!!
            dto.id = master.id!!.id
            dto.employeeId = master.employee!!.id
            dto.yearMonth = master.yyyyMm!!
            dto.name = master.employee!!.name!!
            dto.status = master.status!!.name!!
            dto.location = master.location!!.name!!
            dto.claimedAmount = amounts.get(dto.id)!!.get("amount") as Double
            dto.displayStatus = master.displayStatus
            dto.lastApprovedBy = master.currentlyApprovedBy
            dto.employeeCode = master.employeeCode
            dto.locationType = master.locationType!!
            if (approvedAmounts.containsKey(dto.id)) {
                dto.approvedAmount = approvedAmounts[dto.id]!!.get("amount") as Double
                dto.approvedOn = approvedAmounts[dto.id]!!.get("expmt_updated_on") as String
                dto.submittedOn = approvedAmounts[dto.id]!!.get("expaa_created_on") as String
            }else {
                dto.approvedAmount = 0.0
                dto.approvedOn = null
                dto.submittedOn = null
            }

            dtos.add(dto)
        }
       return dtos
    }





}