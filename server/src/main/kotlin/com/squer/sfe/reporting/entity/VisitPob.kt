package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "vtpob", tableName = "RPT_VISIT_POB")
class VisitPob: AbstractAuditableEntity() {
    var attendee: SquerId? = null
    var product: NamedSquerId? = null
    var quantity: Int? = null
    var isActive: Boolean? = null
}