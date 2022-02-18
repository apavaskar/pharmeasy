package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "stckt", tableName = "CMT_STOCKIST_MASTER")
class Stockist: Person() {
    var location: NamedSquerId? = null
    var status: NamedSquerId? = null
}