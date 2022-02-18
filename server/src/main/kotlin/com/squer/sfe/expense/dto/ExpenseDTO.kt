package com.squer.sfe.expense.dto

import com.squer.sfe.common.controller.dto.EmployeeDTO
import com.squer.sfe.common.entity.SystemLov
import com.squer.sfe.expense.entity.ExpenseApprovalAmount
import com.squer.sfe.expense.entity.Routs

class ExpenseDTO {
    var visitDate: String? = null
    var physicalCount: Int? = null
    var digitalCount: Int? = null
    var visitCount: Int? = null
    var activities: MutableList<String>? = null
    var nonCallList: MutableList<SystemLov>? = null
    var selectedRoute : MutableList<String>? = null
    var routes: MutableList<Routs>? = null
    var oneWayDistance: Double? = null
    var returnDistance: Double? = null
    var totalFare: Double? = null
    var totalDa: Double? = null
    var totalOther: Double? = null
    var totalLodging: Double? = null
    var totalMeetingAllowance: Double? = null
    var totalMobile: Double? = null
    var sundries: Double? = null
    var totalExpense: Double? = null
    var totalConveyance: Double? = null
    var locationTypeId: String? = null
    var documents = mutableListOf<ExpenseDocumentDTO>()
}

class ExpenseDocumentDTO {
    var fileName: String? = null
    var documentId: String? = null
    var documentType: String? = null
    var documentByteCode: String? = null
}

class ExpenseContainerDTO {
    var employeeDetails: EmployeeDTO? = null
    var masterId: String = ""
    var sundries: Double? = 0.0
    var totalClaimed: Double? = 0.0
    lateinit var status: String
    lateinit var details: MutableList<ExpenseDTO>
    var summaries: MutableList<ExpenseApprovalAmount> = mutableListOf()
}

