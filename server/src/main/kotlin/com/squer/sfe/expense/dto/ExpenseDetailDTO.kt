package com.squer.sfe.expense.dto

import com.squer.sfe.expense.entity.ExpenseLocalConvenyanceDetails

class ExpenseDetailDTO {
    var expenseId: String? = null
    var employeeId: String? = null
    var yyyyMmDd: Int? = null
    var expenseTypeId: String? = null
    var locationTypeId: String? = null
    var amount: Double? = null
    var remarks: String? = null
    var documents: List<ExpenseDocumentDTO>? = null
    var routes: List<RouteDTO>? = null
    var conveyanceDetails: ExpenseLocalConvenyanceDetails? = null
}