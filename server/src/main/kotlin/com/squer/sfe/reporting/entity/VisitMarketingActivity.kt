package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "mract", tableName = "RPT_MARKETING_ACTIVITY")
class VisitMarketingActivity: AbstractAuditableEntity() {
    var attendee: SquerId? = null
    var activity: NamedSquerId? = null
    var duration: Double? = null
    var inClinicActivity: Boolean? = null
    var isActive: Boolean? = null
}