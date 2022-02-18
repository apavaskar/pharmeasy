package com.squer.sfe.common.controller.dto

import com.squer.platform.business.entity.NamedSquerId

data class BrandDTO(
    var brand: NamedSquerId? = null,
    var rcpaValue: Double? = null,
    var rxnUnits: Int? = null,
    var showInDetailing: Boolean? = null,
    var showInRcpa: Boolean? = null,
    var competitorBrands: List<BrandDTO>? = null,
)