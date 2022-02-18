package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta

@EntityMeta(prefix = "syslv", tableName = "FMK_SYSTEM_LOV")
class SystemLov: AbstractStandardEntity() {
    var displayOrder: Int? = null
    var type: String? = null
    var isActive: Boolean? = null
}