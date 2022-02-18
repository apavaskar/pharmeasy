package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "mracb", tableName = "RPT_MARKETING_ACTIVITY_BRANDS")
class VisitMarketingActivityBrands: AbstractAuditableEntity() {
    var marketingActivity: SquerId? = null
    var brand: NamedSquerId? = null
}