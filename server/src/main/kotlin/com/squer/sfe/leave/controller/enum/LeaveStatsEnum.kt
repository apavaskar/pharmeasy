package com.squer.sfe.leave.controller.enum

import com.squer.platform.business.entity.NamedSquerId

enum class LeaveStatusEnum(var status: NamedSquerId) {
    LEAVE_APPLIED(NamedSquerId("syslv00000000000000000000000000000034","LEAVE_APPLIED")),
    LEAVE_APPROVED(NamedSquerId("syslv00000000000000000000000000000035","LEAVE_APPROVED")),
    LEAVE_REJECTED(NamedSquerId("syslv00000000000000000000000000000036","LEAVE_REJECTED")),
    LEAVE_CANCELED(NamedSquerId("syslv00000000000000000000000000000037","LEAVE_CANCELED")),
}