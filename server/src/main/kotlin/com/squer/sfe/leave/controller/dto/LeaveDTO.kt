package com.squer.sfe.leave.controller.dto

import com.squer.platform.business.entity.NamedSquerId

data class LeaveDTO(
    var id: String? = null,
    var employeeId: NamedSquerId? = null,
    var fromDate: Int? = null,
    var toDate: Int? = null,
    var leaveType: NamedSquerId? = null,
    var actualLeaveDays: Int? = null,
    var reason: String? = null,
    var status: NamedSquerId? = null
)