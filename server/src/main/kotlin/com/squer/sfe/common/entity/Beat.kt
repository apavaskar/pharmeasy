package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "beats", tableName = "CMT_BEAT_MASTER")
class Beat: AbstractStandardEntity()  {
    var location: NamedSquerId? = null
    var isActive: Boolean? = null
    var isDefault: Boolean? = null
}