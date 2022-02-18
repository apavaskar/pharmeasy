package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "mradt", tableName = "RPT_MARKETING_ACTIVITY_DOCTORS")
class VisitMarketingActivityDoctors: AbstractAuditableEntity() {
    var marketingActivity: SquerId? = null
    var doctor: NamedSquerId? = null
}