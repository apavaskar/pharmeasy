package com.squer.sfe.expense.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "distn", tableName = "EXP_DISTANCE_MASTER")
class Distance: AbstractAuditableEntity() {
    var fromTown: NamedSquerId ? = null
    var toTown: NamedSquerId? = null
    var fromState: NamedSquerId? = null
    var toState: NamedSquerId? = null
    var kms: Double? = null
    var fromToLoc: String? = null
    var toFromLoc: String? = null
}