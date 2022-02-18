package com.squer.sfe.reporting.controller.enum

import com.squer.platform.business.entity.NamedSquerId

enum class JoineeStatusEnum(var status: NamedSquerId) {
    PENDING(NamedSquerId("syslv00000000000000000000000000000031","Pending")),
    APPROVED(NamedSquerId("syslv00000000000000000000000000000032","Approved")),
    REJECTED(NamedSquerId("syslv00000000000000000000000000000033","Rejected")),
}