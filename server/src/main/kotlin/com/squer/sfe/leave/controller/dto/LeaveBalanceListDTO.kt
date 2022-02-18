package com.squer.sfe.leave.controller.dto

import com.squer.platform.business.entity.NamedSquerId

data class LeaveBalanceListDTO (
    var leaveType: NamedSquerId? = null,
    var opening: Double? = null,
    var consumed: Double? = null,
    var balance: Double? = null,
    var adjusted: Double? = null
)