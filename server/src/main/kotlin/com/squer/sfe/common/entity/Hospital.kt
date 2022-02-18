package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "hsptl", tableName = "CMT_HOSPITAL_MASTER")
class Hospital: AbstractStandardEntity() {
    var code: String? = null
    var location: NamedSquerId?= null
    var icuBeds: Int? = null
    var icuPatientCapacity: Int? = null
    var isActive: Boolean? = null
}