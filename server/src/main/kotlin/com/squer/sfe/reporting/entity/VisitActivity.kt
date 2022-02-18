package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "vactv", tableName = "RPT_VISIT_ACTIVITY")
class VisitActivity: AbstractAuditableEntity() {
    var attendee: SquerId? = null
    var type: NamedSquerId? = null
    var duration: Double? = null
    var brand: NamedSquerId? = null
    var attendees: Int? = null
    var leads: Int? = null
    var isActive: Boolean? = null
}