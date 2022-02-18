package com.squer.sfe.reporting.controller.enum

import com.squer.platform.business.entity.NamedSquerId

enum class HospitalRcpaStatusEnum(var status: NamedSquerId) {
    SUBMITTED(NamedSquerId("syslv00000000000000000000000000000046","Submitted")),
    APPROVED(NamedSquerId("syslv00000000000000000000000000000047","Approved")),
    REJECTED(NamedSquerId("syslv00000000000000000000000000000048","Rejected"))
}