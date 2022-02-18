package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import java.util.*

@EntityMeta(prefix = "digvs", tableName = "RPT_DIGITAL_VISIT")
class DigitalVisit: AbstractAuditableEntity() {
    var attendee: SquerId? = null
    var isActive: Boolean? = null
    var visitMode: NamedSquerId? = null
    var startTime: Date? = null
    var duration: Double? = null
    var templateId: SquerId? = null
}