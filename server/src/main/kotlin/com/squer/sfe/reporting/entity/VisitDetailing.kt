package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "vdetl", tableName = "RPT_VISIT_DETAILING")
class VisitDetailing: AbstractAuditableEntity() {
    var attendee: SquerId? = null
    var sequence: Int? = null
    var brand: NamedSquerId? = null
    var messageType: NamedSquerId? = null
    var prescriptionLevel: Int? = null
    var isActive: Boolean? = null
}