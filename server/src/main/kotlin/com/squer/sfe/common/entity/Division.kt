package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "divsn", tableName = "CMT_DIVISION_MASTER")
class Division : AbstractStandardEntity() {
    var code: String? = null
    var isActive: Boolean? = null
}