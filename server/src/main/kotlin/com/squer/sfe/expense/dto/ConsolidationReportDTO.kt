package com.squer.sfe.expense.dto

class ConsolidationReportDTO {
    var division: String? = null
    var zone: String? = null
    var region: String? = null
    var hq: String? = null
    var locationType: String? = null
    var employeeCode: String? = null
    var employeeName: String? = null
    var dateOfJoining: String? = null
    var expenseMonth: Int? = null
    var expenseYear: Int? = null
    var hqDays: Double? = null
    var exHqDays: Double? = null
    var outstationDays: Double? = null
    var status: String? = null
    var totalClaimed: Double = 0.0
    var grandTotal: Double = 0.0
    var submissionDate: String? = null
    var managerApprovalDates: String? = null
    var misApprovalDate: String? = null
    var categoryList = mutableListOf<ConsolidationCategoryDTO>()
}

class ConsolidationCategoryDTO {
    var categoryName: String? =null
    var claimed: Double = 0.0
    var added: Double = 0.0
    var deducted: Double = 0.0
    var total: Double = 0.0
    var remarks: String? = null
}