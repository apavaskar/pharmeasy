package com.squer.sfe.expense.service

import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import com.squer.sfe.expense.ExpenseQueryName
import com.squer.sfe.expense.entity.ExpenseMaster
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.ApprovalChainInstance
import com.squer.sfe.common.service.ApprovalService
import com.squer.sfe.common.service.EmployeeProfileService
import com.squer.sfe.common.service.EmployeeService
import com.squer.sfe.expense.entity.ExpenseApprovalAmount
import com.squer.sfe.expense.entity.ExpenseDetails
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestParam
import java.text.SimpleDateFormat
import java.util.*
import kotlin.math.exp

@Service
@Transactional
class ExpenseMasterService {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var employeeService: EmployeeService

    @Autowired
    lateinit var approvalService: ApprovalService

    @Autowired
    lateinit var employeeProfileService: EmployeeProfileService

    fun findById(id: String): ExpenseMaster {
        val searchCriteria = SearchCriteria(ExpenseQueryName.EXPMT_SELECT.query)
        searchCriteria.addCondition("expmt_id", id)
        return repository.find(searchCriteria).filterIsInstance<ExpenseMaster>().first()
    }

    fun create(entity: ExpenseMaster): ExpenseMaster {
        return repository.create(entity) as ExpenseMaster
    }

    fun update(entity: ExpenseMaster): ExpenseMaster {
        return repository.update(entity) as ExpenseMaster
    }

    fun findByParams(valueMap: Map<String, Any>): List<ExpenseMaster> {
        val searchCriteria = SearchCriteria(ExpenseQueryName.EXPMT_SELECT.query)
        valueMap.forEach {
            searchCriteria.addCondition(it.key, it.value)
        }
        return repository.find(searchCriteria).filterIsInstance<ExpenseMaster>()
    }

    fun getExpenseForUser(employeeId: String, yyyyMmDd: String): ExpenseMaster {
        var dateFormat = SimpleDateFormat("yyyyMMdd")
        var calender = Calendar.getInstance()
        calender.time = dateFormat.parse(yyyyMmDd)
        val monthYearFormat = SimpleDateFormat("yyyyMM")
        var valueMap = mutableMapOf<String, Any>()
        valueMap.put("expmt_employee_id", employeeId)
        valueMap.put("expmt_yyyy_mm", monthYearFormat.format(calender.time).toInt())
        var expenseList = findByParams(valueMap)
        if (expenseList.isNotEmpty()) {
            return expenseList[0]
        } else {
            var employee = employeeService.findById(employeeId)
            var expense = ExpenseMaster()
            expense.employee = NamedSquerId(employeeId, "")
            expense.location = employee.profiles!![0].location
            expense.year = calender.get(Calendar.YEAR)
            expense.month = calender.get(Calendar.MONTH) + 1
            expense.yyyyMm = monthYearFormat.format(calender.time).toInt()
            expense.currentlyApprovedBy = null
            expense.status = NamedSquerId(ExpenseStatus.DRAFT.id, "")
            return repository.create(expense) as ExpenseMaster
        }
    }

    fun submitExpense(employeeId: String, yearMonth: Int): Boolean {
        val categoryCriteria = SearchCriteria(ExpenseQueryName.EXPENSE_CATEGORY_ALLOWANCE_SELECT.query)
        val listOfAllowancesByCategory = repository.find(categoryCriteria)
            .filterIsInstance<MutableMap<String, String>>()
            .associateBy({ it["alcta_allowance_id"] }, { it["alcta_category_id"] }).toMutableMap()
        var mapOfExpenseByCategory = mutableMapOf<String, Double>()
        val categories = listOf<String>(
            "alctg00000000000000000000000000000001",
            "alctg00000000000000000000000000000002",
            "alctg00000000000000000000000000000003",
            "alctg00000000000000000000000000000004",
            "alctg00000000000000000000000000000005",
            "alctg00000000000000000000000000000006",
            "alctg00000000000000000000000000000007",
            "alctg00000000000000000000000000000008",
            "alctg00000000000000000000000000000009",
        )
        categories.forEach { it -> mapOfExpenseByCategory.put(it, 0.0) }

        var valueMap = mutableMapOf<String, Any>()
        valueMap.put("expmt_employee_id", employeeId)
        valueMap.put("expmt_yyyy_mm", yearMonth)
        var expenseList = findByParams(valueMap)
        if (expenseList.isNotEmpty()) {
            var expense = expenseList[0];

            val detailsCriteria = SearchCriteria(ExpenseQueryName.EXPDT_SELECT.query)
            detailsCriteria.addCondition("expdt_expense_id", expense.id!!)
            val details = repository.find(detailsCriteria).filterIsInstance<ExpenseDetails>()
            details.forEach { it ->
                val categoryId = listOfAllowancesByCategory.get(it.expenseType!!.id)
                var amount = mapOfExpenseByCategory.get(categoryId)?.plus(it.amount!!)
                mapOfExpenseByCategory.put(categoryId!!, amount!!)
            }

            var restored = repository.restore(expense.id!!) as ExpenseMaster
            restored.status = NamedSquerId(ExpenseStatus.SUBMITTED.id, "")
            restored.displayStatus  = "Submitted"
            repository.update(restored)
            val chainInstances = approvalService.createChain(employeeId, "EXPENSE", expense.id!!.id)

            chainInstances.forEach { chain ->
                categories.forEach { category ->
                    val approvalAmount = ExpenseApprovalAmount()
                    val amountClaimed = mapOfExpenseByCategory.get(category)
                    approvalAmount.amountClaimed = amountClaimed!!
                    approvalAmount.expense = expense.id!!
                    approvalAmount.allowanceCategory = NamedSquerId(category, "")
                    approvalAmount.manager = chain.approver
                    approvalAmount.jobRole = chain.jobTitle!!
                    approvalAmount.status = "DRAFT"
                    approvalAmount.chain = chain.id!!
                    repository.create(approvalAmount)
                }
            }
            return true
        }
        return false
    }


    fun approveAmounts(approvedAmounts: MutableList<Map<String, Any>>): Boolean {
        try {
            var managerId = "";
            var expenseId = "";
            approvedAmounts.forEach {
                expenseId = it.get("expenseId") as String
                managerId = it.get("managerId") as String
                var columnName = "";
                when (it["type"]) {
                    "claimed" -> columnName = "expaa_amount_claimed"
                    "added" -> columnName = "expaa_amount_added"
                    "deducted" -> columnName = "expaa_amount_deducted"
                    "total" -> columnName = "expaa_amount_approved"
                    "remarks" -> columnName = "expaa_remarks"
                }
                it.keys.forEach { key ->
                    if (key != "expenseId" && key != "managerId" && key != "type" && key != "title" && key != "remarks") {
                        print(columnName)
                        var updateMap = mutableMapOf<String, Any>()
                        updateMap.put("expenseId", expenseId!!)
                        updateMap.put("managerId", managerId!!)
                        updateMap.put("allowanceId", key)
                        updateMap.put("columnName", columnName)
                        val number = it.get(key)
                        if (number is Int) {
                            updateMap.put("column", number * 1.0)
                        } else if (number is Double){
                            updateMap.put("column", it.get(key) as Double)
                        } else {
                            updateMap.put("column", if (it.get(key) == null) "" else  it.get(key) as String)
                        }
                        if (columnName != "expaa_amount_claimed")
                            repository.fireAdhoc(ExpenseQueryName.EXPAA_ADHOC_UPDATE.query, updateMap)
                    }
                }
            }

            val profile = employeeProfileService.getProfile(managerId).get(0)

            var master = repository.restore(SquerId(expenseId)) as ExpenseMaster
            master.displayStatus = "Approved by ${profile.jobRole!!.name}"
            master.currentlyApprovedBy = NamedSquerId(managerId,"")
            if (profile.jobRole!!.id == "jobrl10000000000000000000000000000001") {
                master.status = NamedSquerId(ExpenseStatus.APPROVED.id,"")
            }
            repository.update(master)

            //find next in line
            var chainCriteria = SearchCriteria(CommonQueryName.APPROVAL_CHAIN_SELECT.query)
            chainCriteria.addCondition("aprci_approver_id", managerId)
            chainCriteria.addCondition("aprci_owner_id", expenseId)
            var chain = repository.find(chainCriteria).filterIsInstance<ApprovalChainInstance>().first()
            chain.approvalStatus = "APPROVED"
            repository.update(chain)

            var isAtEndOfChain = false
            while(isAtEndOfChain == false) {
                chainCriteria = SearchCriteria(CommonQueryName.APPROVAL_CHAIN_SELECT.query)
                chainCriteria.addCondition("aprci_approver_level", " > ", chain.approverLevel)
                chainCriteria.addCondition("aprci_owner_id", expenseId)
                var chains = repository.find(chainCriteria).filterIsInstance<ApprovalChainInstance>()
                if (chains.isEmpty()){
                    isAtEndOfChain = true
                } else {
                    chain = chains.first()
                    var updateAmounts = mutableMapOf<String, Any>()
                    updateAmounts.put("managerId", chain.approver!!.id)
                    updateAmounts.put("expenseId", expenseId)
                    updateAmounts.put("approverId", managerId)
                    repository.fireAdhoc(ExpenseQueryName.ALLOWANCE_AMOUNT_APPROVE_UPDATE.query, updateAmounts)
                }
            }
            return true
        } catch (e: Exception) {
            e.printStackTrace()
            throw e
        }
    }

    fun resubmitExpenses(yearMonth: Int, employeeId: String): Boolean {
        var valueMap = mutableMapOf<String, Any>()
        if (employeeId != "all")
            valueMap.put("expmt_employee_id", employeeId)
        valueMap.put("expmt_yyyy_mm", yearMonth)
        valueMap.put("expmt_status_id", "syslves000000000000000000000000000002")
        val masters =  findByParams(valueMap).filterIsInstance<ExpenseMaster>()
        masters.forEach {
            val expenseId = it.id!!.id
            val employeeId = it.employee!!.id
            var criteria = mutableMapOf<String, Any>()
            criteria.put("ownerId", expenseId)
            repository.fireAdhoc(CommonQueryName.APPROVAL_CHAIN_DELETE.query, criteria)

            criteria = mutableMapOf()
            criteria.put("expenseId", expenseId)
            repository.fireAdhoc(ExpenseQueryName.ALLOWANCE_AMOUNT_DELETE.query, criteria)

            submitExpense(employeeId, yearMonth)
        }
        return true
    }

    fun resetExpenses(yearMonth: Int, employeeId: String): Boolean {
        var valueMap = mutableMapOf<String, Any>()
        valueMap.put("expmt_employee_id", employeeId)
        valueMap.put("expmt_yyyy_mm", yearMonth)
        valueMap.put("expmt_status_id", "syslves000000000000000000000000000002")
        val masters =  findByParams(valueMap).filterIsInstance<ExpenseMaster>()
        masters.forEach {
            val expenseId = it.id!!.id
            val employeeId = it.employee!!.id
            var criteria = mutableMapOf<String, Any>()
            criteria.put("ownerId", expenseId)
            repository.fireAdhoc(CommonQueryName.APPROVAL_CHAIN_DELETE.query, criteria)

            val expenseAmountsCriteria = SearchCriteria(ExpenseQueryName.EXPAA_SELECT.query)
            expenseAmountsCriteria.addCondition("expaa_expense_id", expenseId)
            expenseAmountsCriteria.addCondition("expaa_manager_id","emply12000000000000000000000000000000")
            val amounts = repository.find(expenseAmountsCriteria).filterIsInstance<ExpenseApprovalAmount>()
            amounts.forEach { amt ->
                amt.amountApproved = 0.0
                amt.amountClaimed = 0.0
                amt.amountDeducted = 0.0

            }

        }
        return true
    }
}

