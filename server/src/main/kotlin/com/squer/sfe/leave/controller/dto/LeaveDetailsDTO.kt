package com.squer.sfe.leave.controller.dto

import java.util.*

class LeaveDetailsDTO {
    var leaveId: String? = null
    var leaveType: String? = null
    var fromDate: Date? = null
    var toDate: Date? = null
    var totalDays:Double? = null
    var status: String? = null
    var updatedOn: Date? = null
    var updatedBy: String? = null
}

data class EmployeeLeaveDTO (
    var leaveLists: List<LeaveDetailsDTO>? = null,
    var balanceList: List<LeaveBalanceListDTO>? = null
)