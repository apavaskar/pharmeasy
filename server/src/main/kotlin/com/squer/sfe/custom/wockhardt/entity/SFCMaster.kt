package com.squer.sfe.custom.wockhardt.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "wcsfc", tableName = "CST_WOCKHARDT_SFC")
class SFCMaster: AbstractAuditableEntity() {
    lateinit var location: NamedSquerId
    lateinit var fromTown: NamedSquerId
    lateinit var toTown: NamedSquerId
    var distance: Double =  0.0
    var correctedDistance: Double = 0.0
}