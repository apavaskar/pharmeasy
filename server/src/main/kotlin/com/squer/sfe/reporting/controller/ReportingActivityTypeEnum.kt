package com.squer.sfe.reporting.controller

import com.squer.platform.business.entity.NamedSquerId

enum class ReportingActivityTypeEnum (var type: NamedSquerId) {
    CALL_ACTIVITY(NamedSquerId("syslv00000000000000000000000000000024","CALL-ACTIVITY")),
    NON_CALL_ACTIVITY(NamedSquerId("syslv00000000000000000000000000000025","NON_CALL_ACTIVITY")),
    LEAVE(NamedSquerId("syslv00000000000000000000000000000026","LEAVE")),
    MARKETING_ACTIVITY(NamedSquerId("syslv00000000000000000000000000000045","MARKETING_ACTIVITY")),
}