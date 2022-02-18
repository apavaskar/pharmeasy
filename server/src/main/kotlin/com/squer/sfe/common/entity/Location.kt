package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "locat", tableName = "CMT_LOCATION_MASTER")
class Location: AbstractStandardEntity() {
    var type: NamedSquerId? = null
    var division: NamedSquerId? = null
    var town: NamedSquerId? = null
    var isActive: Boolean? = null
    var parent: NamedSquerId? = null
    var externalCode: String? = null
    var externalName: String? = null
}