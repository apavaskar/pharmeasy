package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "vinpt", tableName = "RPT_VISIT_INPUTS")
class VisitInputs: AbstractAuditableEntity() {
    var attendee: SquerId? = null
    var input: SquerId? = null
    var quantity: Int? = null
    var isActive: Boolean? = null
}