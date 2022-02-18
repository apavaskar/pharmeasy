package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "loctt", tableName = "CMT_LOCATION_TYPE")
class LocationType: AbstractStandardEntity() {
    var parent: NamedSquerId? = null
    var level: Int? = null
}