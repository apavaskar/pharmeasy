package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "towns", tableName = "CMT_TOWN_MASTER")
class Town: AbstractStandardEntity() {
    var state: NamedSquerId? = null
    var pinCode: String = ""
    var type: NamedSquerId? = null
    var classification: NamedSquerId? = null
}