package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "chmst", tableName = "CMT_CHEMIST_MASTER")
class Chemist: Person() {
    var location: NamedSquerId? = null
    var status: NamedSquerId? = null
    var doctors: List<NamedSquerId>? = null
    var beat: NamedSquerId? = null
}