package com.squer.sfe.expense.dto

import com.squer.platform.business.entity.NamedSquerId

class ExpenseMasterDTO {
    lateinit var division: String
    lateinit var id: String
    lateinit var employeeId: String
    lateinit var locationType: NamedSquerId
    var yearMonth: Int = 0
    lateinit var name: String
    lateinit var location: String
    var claimedAmount: Double = 0.0
    var approvedAmount: Double = 0.0
    var submittedOn: String? = null
    var approvedOn: String? = null
    lateinit var status: String
    lateinit var displayStatus: String
    var lastApprovedBy: NamedSquerId? = null
    lateinit var employeeCode: String

}