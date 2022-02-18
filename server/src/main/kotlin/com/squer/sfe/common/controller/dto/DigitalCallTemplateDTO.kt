package com.squer.sfe.common.controller.dto

import com.squer.platform.business.entity.NamedSquerId

data class DigitalCallTemplateDTO(
    var id: String? = null,
    var brand: NamedSquerId? = null,
    var callType: NamedSquerId? = null,
    var templateText: String? = null,
)