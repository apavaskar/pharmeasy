package com.squer.sfe.common.controller.dto

import com.squer.platform.business.entity.NamedSquerId

data class MarketingActivityDTO(
    var activity: NamedSquerId? = null,
    var inClinicActivity: Boolean? = null
)