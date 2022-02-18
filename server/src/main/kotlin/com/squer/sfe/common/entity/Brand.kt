package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "brand", tableName = "CMT_BRAND_MASTER")
class Brand : AbstractStandardEntity() {
    var division: NamedSquerId? = null
    var isActive: Boolean? = null
    var isOwn: Boolean? = null
    var parent: NamedSquerId? = null
    var competitorBrandList: List<NamedSquerId>? = null
    var rcpaValue: Double? = null
    var rxnUnits: Int? = null
    var showInDetailing: Boolean? = null
    var showInRcpa: Boolean? = null
}