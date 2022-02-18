package com.squer.sfe.expense.controller

import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.expense.ExpenseQueryName
import com.squer.sfe.expense.dto.ConsolidationCategoryDTO
import com.squer.sfe.expense.dto.ConsolidationReportDTO
import com.squer.sfe.expense.dto.ExpenseContainerDTO
import com.squer.sfe.expense.entity.ExpenseAllowanceCategory
import com.squer.sfe.expense.entity.ExpenseApprovalAmount
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.text.SimpleDateFormat
import java.util.*
import kotlin.jvm.Throws

@RequestMapping("/expense/report")
@RestController
class ExpenseReportController {
    @Autowired
    lateinit var repository: SquerRepository

    @Throws(SquerException::class)
    @GetMapping("/consolidation-report/{divisionId}/{yyyyMm}")
    fun getConsolidationReport(@PathVariable divisionId: String, @PathVariable yyyyMm: Int): List<ConsolidationReportDTO> {
        val yyyyMM = SimpleDateFormat("yyyyMMdd")
        var calendar = Calendar.getInstance()
        calendar.time = yyyyMM.parse(yyyyMm.toString()+"01")

        var searchCriteriaCategory = SearchCriteria(ExpenseQueryName.EXPENSE_ALLOWANCE_CATEGORY_SELECT.query)
        var categories = repository.find(searchCriteriaCategory).filterIsInstance<ExpenseAllowanceCategory>()
        categories =  categories.sortedBy { it.id!!.id }

        var searchCategoryMaster = SearchCriteria(ExpenseQueryName.CONSOLIDATED_EXPENSE_MASTER_SELECT.query)
        searchCategoryMaster.addCondition("divisionId",divisionId)
        searchCategoryMaster.addCondition("yyyyMM",yyyyMm)
        var masterMapList = repository.find(searchCategoryMaster).filterIsInstance<Map<String,Any>>()

        var searchCriteriaDetails = SearchCriteria(ExpenseQueryName.CONSOLIDATED_EXPENSE_DETAILS_SELECT.query)
        searchCriteriaDetails.addCondition("divisionId",divisionId)
        searchCriteriaDetails.addCondition("yyyyMM",yyyyMm)
        var detailList = repository.find(searchCriteriaDetails).filterIsInstance<Map<String,Any>>()
        var detailMap = mutableMapOf<String, Map<String,Any>>()
        detailList.forEach { it ->
            var key = it["expense_id"].toString()+it["category_id"].toString()
            detailMap[key] = it
        }

        var searchCriteriaClaimedAmt = SearchCriteria(ExpenseQueryName.CONSOLIDATED_EXPENSE_CLAIMED_AMOUNT_SELECT.query)
        searchCriteriaClaimedAmt.addCondition("divisionId",divisionId)
        searchCriteriaClaimedAmt.addCondition("yyyyMM",yyyyMm)
        var claimedAmountList = repository.find(searchCriteriaClaimedAmt).filterIsInstance<Map<String,Any>>()
        var claimedMap = mutableMapOf<String, Double>()
        claimedAmountList.forEach { it ->
            var key = it["expense_id"].toString()+it["category_id"].toString()
            claimedMap[key] = it["amount_claimed"].toString().toDouble()
        }

        var searchCriteriaLocationType = SearchCriteria(ExpenseQueryName.CONSOLIDATED_EXPENSE_TYPE_SELECT.query)
        searchCriteriaLocationType.addCondition("divisionId",divisionId)
        searchCriteriaLocationType.addCondition("yyyyMM",yyyyMm)
        var expenseTypeList = repository.find(searchCriteriaLocationType).filterIsInstance<Map<String,Any>>()
        var expenseTypeMap = mutableMapOf<String, Double>()
        expenseTypeList.forEach {
            var key = it["expense_id"].toString()+it["location_type"].toString()
            expenseTypeMap[key] = it["cnt"].toString().toDouble()
        }

        var searchCriteriaManagerApprovalDate = SearchCriteria(ExpenseQueryName.CONSOLIDATED_EXPENSE_MANAGER_APPROVE_DATE.query)
        searchCriteriaManagerApprovalDate.addCondition("divisionId",divisionId)
        searchCriteriaManagerApprovalDate.addCondition("yyyyMM",yyyyMm)
        var expenseManagerApprovalDates = repository.find(searchCriteriaManagerApprovalDate).filterIsInstance<Map<String,Any>>()
        var managerApprovalDateMap = mutableMapOf<String, String>()
        expenseManagerApprovalDates.forEach {
            managerApprovalDateMap[it["owner_id"].toString()] = it["aprdt"].toString()
        }

        var searchCriteriaSubmissionDate = SearchCriteria(ExpenseQueryName.CONSOLIDATED_EXPENSE_SUBMISSION_DATE.query)
        searchCriteriaSubmissionDate.addCondition("divisionId",divisionId)
        searchCriteriaSubmissionDate.addCondition("yyyyMM",yyyyMm)
        var submissionDateMapList = repository.find(searchCriteriaSubmissionDate).filterIsInstance<Map<String,Any>>()
        var submissionDateMap = mutableMapOf<String,String>()
        submissionDateMapList.forEach {
            submissionDateMap[it["expense_id"].toString()] = it["exp_date"].toString()
        }

        var dataList = mutableListOf<ConsolidationReportDTO>()
        masterMapList.forEach { mst ->
            var totalClaimed = 0.0
            var grandTotal = 0.0

            var dto = ConsolidationReportDTO()
            dto.division = mst["div_name"].toString()
            dto.zone = mst["zone_nm"].toString()
            dto.region = mst["region"].toString()
            dto.hq = mst["hq"].toString()
            dto.locationType = mst["loc_type"].toString()
            dto.employeeCode = mst["emp_code"].toString()
            dto.employeeName = mst["emp_name"].toString()
            dto.status = mst["exp_status"].toString()
            dto.misApprovalDate = mst["mis_date"].toString()
            dto.dateOfJoining = mst["joining_date"].toString()
            dto.expenseMonth = calendar.get(Calendar.MONTH)+1
            dto.expenseYear = calendar.get(Calendar.YEAR)

            if(submissionDateMap.containsKey(mst["exp_id"].toString())){
                dto.submissionDate = submissionDateMap[mst["exp_id"].toString()]
            }else {
                dto.submissionDate=""
            }

            if(managerApprovalDateMap.containsKey(mst["exp_id"].toString())){
                dto.managerApprovalDates = managerApprovalDateMap[mst["exp_id"].toString()].toString()
            }else {
                dto.managerApprovalDates = ""
            }

            if(expenseTypeMap.containsKey(mst["exp_id"].toString()+"syslv00000000000000000000000000000160"))
                dto.hqDays = expenseTypeMap[mst["exp_id"].toString()+"syslv00000000000000000000000000000160"]
            else
                dto.hqDays = 0.0

            if(expenseTypeMap.containsKey(mst["exp_id"].toString()+"syslv00000000000000000000000000000161"))
                dto.exHqDays = expenseTypeMap[mst["exp_id"].toString()+"syslv00000000000000000000000000000161"]
            else
                dto.exHqDays = 0.0

            if(expenseTypeMap.containsKey(mst["exp_id"].toString()+"syslv00000000000000000000000000000162"))
                dto.outstationDays = expenseTypeMap[mst["exp_id"].toString()+"syslv00000000000000000000000000000162"]
            else
                dto.outstationDays = 0.0

            var categoryDtoList = mutableListOf<ConsolidationCategoryDTO>()

            categories.forEach { cat ->
                var key = mst["exp_id"].toString()+cat.id!!.id

                var categoryDTO = ConsolidationCategoryDTO()
                if(detailMap.containsKey(key)){
                    var approvalAmount = detailMap[key]
                    categoryDTO.categoryName = cat.name
                    if(claimedMap.containsKey(key))
                        categoryDTO.claimed = claimedMap[key]!!
                    else
                        categoryDTO.claimed = 0.0
                    categoryDTO.added = approvalAmount!!["added"].toString().toDouble()
                    categoryDTO.deducted = approvalAmount!!["deducted"].toString().toDouble()
                    categoryDTO.remarks = approvalAmount!!["remarks"].toString()
                }else{
                    categoryDTO.categoryName = cat.name
                    categoryDTO.claimed = 0.0
                    categoryDTO.added = 0.0
                    categoryDTO.deducted = 0.0
                    categoryDTO.remarks = ""
                }
                categoryDTO.total = (categoryDTO.claimed + categoryDTO.added) - categoryDTO.deducted
                grandTotal += categoryDTO.total
                totalClaimed += categoryDTO.claimed
                categoryDtoList.add(categoryDTO)
            }
            dto.totalClaimed = totalClaimed
            dto.grandTotal = grandTotal
            dto.categoryList = categoryDtoList
            dataList.add(dto)
        }
        return dataList
    }
}