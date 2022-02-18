package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta

@EntityMeta(prefix = "holdy", tableName = "CMT_HOLIDAY_MASTER")
class Holiday: AbstractStandardEntity() {
    var isActive : Boolean? = null
}