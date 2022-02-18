package com.squer.sfe.expense.controller

import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.ApiDate
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.controller.dto.EmployeeDTO
import com.squer.sfe.common.entity.Document
import com.squer.sfe.common.entity.Employee
import com.squer.sfe.common.entity.SystemLov
import com.squer.sfe.common.service.DocumentService
import com.squer.sfe.expense.ExpenseQueryName
import com.squer.sfe.expense.dto.*
import com.squer.sfe.expense.entity.ExpenseApprovalAmount
import com.squer.sfe.expense.entity.ExpenseDetails
import com.squer.sfe.expense.entity.ExpenseMaster
import com.squer.sfe.expense.entity.Routs
import com.squer.sfe.expense.service.ExpenseDetailsService
import com.squer.sfe.expense.service.ExpenseMasterService
import com.squer.sfe.expense.service.ExpenseStatus
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.text.SimpleDateFormat
import java.util.*
import kotlin.jvm.Throws

@RequestMapping("/expense")
@RestController
class ExpenseController {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var expenseMasterService: ExpenseMasterService

    @Autowired
    lateinit var expenseDetailsService: ExpenseDetailsService

    @Autowired
    lateinit var documentService: DocumentService

    @Throws(SquerException::class)
    @GetMapping("/by-month/{employeeId}/{yyyyMm}")
    fun getByMonth(@PathVariable employeeId: String,@PathVariable yyyyMm: String): ExpenseContainerDTO {
        var expenseMaster = ExpenseContainerDTO()
        var employee = repository.restore(SquerId(employeeId)) as Employee

        var valueMap = mutableMapOf<String, Any>()
        valueMap.put("expmt_employee_id", employeeId)
        valueMap.put("expmt_yyyy_mm", yyyyMm.toInt())
        val masters = expenseMasterService.findByParams(valueMap).filterIsInstance<ExpenseMaster>()
        var master = ExpenseMaster()
        if (masters.isNotEmpty() )
            master = masters[0];

        val categoryCriteria = SearchCriteria(ExpenseQueryName.EXPENSE_CATEGORY_ALLOWANCE_SELECT.query)
        val listOfAllowancesByCategory =  repository.find(categoryCriteria)
            .filterIsInstance<MutableMap<String, String>>()
            .associateBy ({it["alcta_allowance_id"] }, {it["alcta_category_id"]}).toMutableMap()

        var nonCallListCriteria = SearchCriteria(CommonQueryName.SYSLV_SELECT.query);
        nonCallListCriteria.addCondition("syslv_type", "NON_CALL_ACTIVITY");
        val listOfNonCallActivities = repository.find(nonCallListCriteria).filterIsInstance<SystemLov>();
        var mapOfActivities = mutableMapOf<String, SystemLov>()
        listOfNonCallActivities.forEach {
            mapOfActivities.put(it.id!!.id, it)
        }

        val dateFormat = SimpleDateFormat("yyyyMMdd")
        var calender = Calendar.getInstance()
        calender.time = ApiDate((yyyyMm+"01").toInt()).date

        calender.set(Calendar.DATE,calender.getActualMinimum(Calendar.DATE))
        var fromDate = calender.time
        calender.set(Calendar.DATE, calender.getActualMaximum(Calendar.DATE))
        var toDate = calender.time

        var dtoList = mutableListOf<ExpenseDTO>()

        //daily visit count select
        var searchCriteriaVc = SearchCriteria(ExpenseQueryName.EXPENSE_VISIT_COUNT_SELECT.query)
        searchCriteriaVc.addCondition("employeeId",employeeId)
        searchCriteriaVc.addCondition("yearMonth",yyyyMm.toInt())
        var visitCountMap = repository.find(searchCriteriaVc).filterIsInstance<Map<String,Any>>().associateBy ({it.get("visit_date")},{it})
        //daily visit type select
        var searchCriteriaVtp = SearchCriteria(ExpenseQueryName.EXPENSE_DAILY_VISIT_TYPE_SELECT.query)
        searchCriteriaVtp.addCondition("employeeId",employeeId)
        searchCriteriaVtp.addCondition("yearMonth",yyyyMm.toInt())
        var visitTypeMapList = repository.find(searchCriteriaVtp).filterIsInstance<Map<String,Any>>()
        var visitTypeMap = mutableMapOf<String, MutableList<String>>()
        var visitTypeIdMap = mutableMapOf<String, MutableList<String>>()

        visitTypeMapList.forEach {
            if(visitTypeMap.containsKey(it.get("visit_date").toString())){
                var list = visitTypeMap.get(it.get("visit_date").toString())
                list!!.add(it.get("visit_type").toString())
            }else {
                var list = mutableListOf<String>()
                list!!.add(it.get("visit_type").toString())
                visitTypeMap.put(it.get("visit_date").toString(), list)
            }

            if(visitTypeIdMap.containsKey(it.get("visit_date").toString())){
                var list = visitTypeIdMap.get(it.get("visit_date").toString())
                if (it.get("activity_id")!= null)  list!!.add(it.get("activity_id").toString())
            }else {
                var list = mutableListOf<String>()
                if (it.get("activity_id")!= null)  list!!.add(it.get("activity_id").toString())
                visitTypeIdMap.put(it.get("visit_date").toString(), list)
            }

        }

        //Find Expense Details entered for the month
        val expenseDetailsCriteria = SearchCriteria(ExpenseQueryName.EXPDT_SELECT.query)
        expenseDetailsCriteria.addCondition("expdt_yyyy_mm", yyyyMm.toInt())
        expenseDetailsCriteria.addCondition("expdt_employee_id", employeeId)
        var expenseDetails = repository.find(expenseDetailsCriteria).filterIsInstance<ExpenseDetails>()
        var expenseDetailsByDate = mutableMapOf<Int, MutableList<ExpenseDetails>>()
        expenseDetails.forEach {
            var list = mutableListOf<ExpenseDetails>()
            if (expenseDetailsByDate.containsKey(it.yyyyMmDd!!))
                list = expenseDetailsByDate.get(it.yyyyMmDd!!)!!
            list.add(it)
            expenseDetailsByDate.put(it.yyyyMmDd!!, list )
        }

        var routesByDetail = getRoutes(yyyyMm, employeeId)

        var totalExpense = 0.0
        while (fromDate <= toDate){
            var dto = ExpenseDTO()
            dto.visitDate = dateFormat.format(fromDate)
            val fromDateInt = dateFormat.format(fromDate).toInt()

            dto.totalFare = 0.0
            dto.oneWayDistance = 0.0
            dto.returnDistance = 0.0
            dto.totalDa = 0.0
            dto.totalOther = 0.0
            dto.totalLodging = 0.0
            dto.totalMeetingAllowance = 0.0
            dto.totalConveyance = 0.0
            dto.totalExpense = 0.0
            dto.totalMobile = 0.0
            if (expenseDetailsByDate.containsKey(dto.visitDate!!.toInt())) {
                val details = expenseDetailsByDate.get(dto.visitDate!!.toInt())!!
                details.forEach {
                    detail ->
                    val expenseTypeId = detail.expenseType?.id!!;
                    val category = listOfAllowancesByCategory[expenseTypeId!!]
                    when (category) {
                        "alctg00000000000000000000000000000001" -> {
                            dto.totalDa = detail.amount
                            dto.locationTypeId = detail.locationType!!.id
                        }
                        "alctg00000000000000000000000000000002" -> {
                            dto.routes = routesByDetail.get(detail.id!!.id)
                            var fare = 0.0
                            var oneWayDistance = 0.0
                            var returnDistance = 0.0
                            dto.routes!!.forEach {
                                fare += it.amount!!
                                oneWayDistance += if (!it.isReturn!!) it.distance!! else 0.0
                                returnDistance += if (it.isReturn!!) it.distance!! else 0.0
                            }
                            dto.oneWayDistance = oneWayDistance
                            dto.returnDistance = returnDistance
                            dto.totalFare = fare
                        }
                        "alctg00000000000000000000000000000004" -> {
                            dto.totalOther = dto.totalOther!! + detail.amount!!
                        }
                        "alctg00000000000000000000000000000005" -> {
                            expenseMaster.sundries = detail.amount!! + expenseMaster.sundries!!
                        }
                        "alctg00000000000000000000000000000003" -> {
                            dto.totalMeetingAllowance = dto.totalMeetingAllowance!! + detail.amount!!
                        }
                        "alctg00000000000000000000000000000006" -> {
                            dto.totalLodging = dto.totalLodging!! + detail.amount!!
                        }
                        "alctg00000000000000000000000000000007" -> {
                            dto.totalConveyance = dto.totalConveyance!! + detail.amount!!
                        }
                        "alctg00000000000000000000000000000008" -> {
                            dto.totalMobile = dto.totalMobile!! + detail.amount!!
                        }
                    }
                }
            }
            dto.totalExpense = dto.totalDa!! + dto.totalFare!! + dto.totalOther!! + dto.totalMeetingAllowance!! + dto.totalLodging!! + dto.totalConveyance!!

            if(visitCountMap.containsKey(fromDateInt)) {
                dto.visitCount = (visitCountMap.get(fromDateInt)?.get("visit_count") as Long).toInt()
                dto.physicalCount = (visitCountMap.get(fromDateInt)?.get("physical_count") as Long).toInt()
                dto.digitalCount = (visitCountMap.get(fromDateInt)?.get("digital_count") as Long).toInt()
            }else {
                dto.visitCount = 0
                dto.physicalCount = 0
                dto.digitalCount = 0
            }

            if(visitTypeMap.containsKey(dateFormat.format(fromDate))) {
                dto.activities = visitTypeMap.get(dateFormat.format(fromDate))!!.toSet().toMutableList()
            }else {
                dto.activities = mutableListOf<String>()
            }

            if (dto.activities!!.contains("syslv00000000000000000000000000000025")) {
                var list = mutableListOf<SystemLov>()
                val key = visitTypeIdMap.get(dateFormat.format(fromDate))!!;
                key.forEach {
                    if (mapOfActivities.containsKey(it))
                        list.add(mapOfActivities.get(it)!!)
                    dto.nonCallList = list
                }
            }
            dtoList.add(dto)
            calender.time = fromDate
            calender.add(Calendar.DATE,1)
            fromDate = calender.time
        }
        expenseMaster.details = dtoList
        expenseMaster.status = if (master.status != null) master.status!!.id else ExpenseStatus.DRAFT.id
        expenseMaster.totalClaimed =  dtoList.sumByDouble {it.totalExpense!!} + expenseMaster.sundries!!

        if (master.id != null) {
            var amountSelect = SearchCriteria(ExpenseQueryName.EXPAA_SELECT.query)
            amountSelect.addCondition("expaa_expense_id", master.id!!.id)
            expenseMaster.summaries =
                repository.find(amountSelect).filterIsInstance<ExpenseApprovalAmount>().toMutableList()
        }

        var employeeDetails = EmployeeDTO()
        employeeDetails.employee = NamedSquerId(employee.id!!.id, employee.name)
        expenseMaster.employeeDetails = employeeDetails
        return expenseMaster
    }

    @Throws(SquerException::class)
    @GetMapping("/visited-towns/{employeeId}/{yyyyMmDd}")
    fun getVisitedTowns(@PathVariable employeeId: String,@PathVariable yyyyMmDd: Int): List<TownDTO> {
        var searchCriteria = SearchCriteria(ExpenseQueryName.EXPENSE_VISITED_TOWNS_SELECT.query)
        searchCriteria.addCondition("employeeId",employeeId)
        searchCriteria.addCondition("yearMonthDate",yyyyMmDd)
        var townsListMap = repository.find(searchCriteria).filterIsInstance<Map<String,String>>()
        var list = mutableListOf<TownDTO>()
        townsListMap.forEach {
            var dto = TownDTO()
            dto.id = it.get("towns_id") as String
            dto.name = it.get("towns_name") as String
            dto.classification = it.get("towns_classification_id") as String
            list.add(dto)
        }
        return list
    }

    @GetMapping("/document-count/{employeeId}/{yyyyMm}")
    fun getDocumentCountForDate(@PathVariable employeeId: String, @PathVariable yyyyMm: Int): List<Map<String, Any>> {
        var documentCountCriteria = SearchCriteria(ExpenseQueryName.EXPENSE_DOCUMENT_BY_DATE.query)
        documentCountCriteria.addCondition("employeeId", employeeId)
        documentCountCriteria.addCondition("yearMonth", yyyyMm)
        return repository.find(documentCountCriteria).filterIsInstance<Map<String, Any>>()
    }


    @PostMapping("/saveExpense")
    fun saveExpense(@RequestBody expenses: List<ExpenseDetailDTO>): Boolean {
        try{
            var expense: ExpenseMaster? = null
            expenses.forEach {
                if (it.expenseTypeId == "") {
                    return@forEach
                }
                if(expense == null){
                    expense = expenseMasterService.getExpenseForUser(it.employeeId!!,it.yyyyMmDd.toString())
                }
                var valueMap = mutableMapOf<String, Any>()
                valueMap.put("expdt_expense_id", expense!!.id!!.id)
                valueMap.put("expdt_yyyy_mm_dd", it.yyyyMmDd!!)
                valueMap.put("expdt_expense_type_id", it.expenseTypeId!!)
                var detailList = expenseDetailsService.findByParams(valueMap)
                expenseDetailsService.deleteExpenseDetails(detailList)

                var dateFormat = SimpleDateFormat("yyyyMMdd")
                var calender = Calendar.getInstance()
                calender.time = dateFormat.parse(it.yyyyMmDd.toString())
                val monthYearFormat = SimpleDateFormat("yyyyMM")

                var expenseDetails = ExpenseDetails()
                expenseDetails.expense = expense!!.id
                expenseDetails.employee = expense!!.employee
                expenseDetails.location = expense!!.location
                expenseDetails.yyyyMm = monthYearFormat.format(calender.time).toInt()
                expenseDetails.yyyyMmDd = it.yyyyMmDd
                expenseDetails.expenseType = NamedSquerId(it.expenseTypeId!!,"")
                it.locationTypeId?.let { locTp ->
                    expenseDetails.locationType = NamedSquerId(locTp,"")
                }
                expenseDetails.amount = it.amount
                expenseDetails.remarks = it.remarks
                expenseDetails = repository.create(expenseDetails) as ExpenseDetails

                it.conveyanceDetails?.let { c ->
                    var map = mutableMapOf<String, Any>()
                    map.put("elcal_expense_id", expenseDetails.id!!.id )
                    repository.fireAdhoc(ExpenseQueryName.EXPENSE_ALLOWANCE_CONVENYANCE_DELETE.query, map);
                    c.expenseDetail = expenseDetails.id!!
                    repository.create(c)
                }

                it.routes?.let {routs ->
                    routs.forEach { rt->
                        var routs = Routs()
                        routs.expenseDetail = expenseDetails.id
                        routs.fromTown = NamedSquerId(rt.fromTownId!!,"")
                        routs.toTown = NamedSquerId(rt.toTownId!!,"")
                        routs.fromTownName = rt.fromTownName
                        routs.toTownName = rt.toTownName
                        rt.transportModeId?.let { tpm ->
                            routs.transportMode = NamedSquerId(tpm, "")
                        }
                        routs.distance = rt.distance
                        routs.allownace = rt.allownace
                        routs.amount = rt.amount
                        routs.isReturn = rt.isReturn
                        repository.create(routs)
                    }
                }
                it.documents?.let {documents ->
                    documents.forEach {d ->
                        var document = Document()
                        document.owner = expenseDetails.id
                        documentService.saveDocument(document, d.documentByteCode!!, d.fileName!!)
                    }
                }
            }
            return true
        }catch (e: Exception){
            e.printStackTrace()
            throw e
        }
    }

    @PutMapping("/approveExpenses")
    fun updateApprovals(@RequestBody approvedAmounts: MutableList<Map<String, Any>>): Boolean {
        return expenseMasterService.approveAmounts(approvedAmounts)
    }

    @PutMapping("/resubmit/{yearMonth}")
    fun resubmitApprovals(@PathVariable yearMonth: Int, @RequestParam(defaultValue = "all") employeeId: String) : Boolean {
        return expenseMasterService.resubmitExpenses(yearMonth, employeeId)
    }

    @GetMapping("/routes/{employeeId}/{yyyyMmDd}")
    fun getRoutesForEmployeeDate(@PathVariable yyyyMmDd: Int, @PathVariable employeeId: String): List<Routs>{
        var routesByDetail: MutableMap<String, MutableList<Routs>> = mutableMapOf()
        val routesForMonthCriteria = SearchCriteria(ExpenseQueryName.EXPENSE_ROUTE_SELECT.query)
        routesForMonthCriteria.addCondition("expdt_yyyy_mm_dd", yyyyMmDd)
        routesForMonthCriteria.addCondition("expdt_employee_id", employeeId)
        return repository.find(routesForMonthCriteria).filterIsInstance<Routs>()
    }

    private fun getRoutes(yyyyMm: String, employeeId: String): MutableMap<String, MutableList<Routs>>{
        var routesByDetail: MutableMap<String, MutableList<Routs>> = mutableMapOf()
        val routesForMonthCriteria = SearchCriteria(ExpenseQueryName.EXPENSE_ROUTE_SELECT.query)
        routesForMonthCriteria.addCondition("expdt_yyyy_mm", yyyyMm.toInt())
        routesForMonthCriteria.addCondition("expdt_employee_id", employeeId)
        val routes = repository.find(routesForMonthCriteria).filterIsInstance<Routs>()
        routes.forEach {
            var list = mutableListOf<Routs>()
            if (routesByDetail.containsKey(it.expenseDetail!!.id)){
                list = routesByDetail.get(it.expenseDetail!!.id)!!
            }
            list.add(it)
            routesByDetail.put(it.expenseDetail!!.id, list)
        }
        return routesByDetail
    }

    @PutMapping("/reset/{employeeCode}/{yearMonth}")
    fun resetExpenseStatus(@PathVariable employeeCode: String, @PathVariable yearMonth: Int): Boolean {
        try {
            var criteria = SearchCriteria(ExpenseQueryName.EXPENSE_FOR_EMPLOYEE_CODE_MONTH_SELECT.query)
            criteria.addCondition("yyyyMM",yearMonth)
            criteria.addCondition("employeeCode",employeeCode)
            var expenses = repository.find(criteria).filterIsInstance<ExpenseMaster>()
            if(expenses.isEmpty()){
                throw Exception("Expense not Found")
            }
            var expense = expenses[0]
            expense.status = NamedSquerId("syslves000000000000000000000000000001","")
            expense.currentlyApprovedBy = null
            expense.displayStatus = "Draft"
            repository.update(expense)

            var mapOfConditions = mutableMapOf<String, Any>()
            mapOfConditions.put("expenseId",expense.id!!.id)

            repository.fireAdhoc(ExpenseQueryName.EXPENSE_APPROVAL_AMOUNT_DELETE.query, mapOfConditions)
            repository.fireAdhoc(ExpenseQueryName.EXPENSE_APPROVAL_DELETE.query, mapOfConditions)
            return true
        }catch (e:Exception){
            e.printStackTrace()
            return false
        }
    }
}