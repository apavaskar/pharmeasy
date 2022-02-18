package com.squer.sfe.leave.controller.dto

import com.squer.platform.business.entity.NamedSquerId

data class LeaveBalanceDTO(
    var leaveType: NamedSquerId? = null,
    var balance: Double? = null
)