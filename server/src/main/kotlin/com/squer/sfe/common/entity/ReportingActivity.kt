package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta

@EntityMeta(prefix = "rpact", tableName = "CMT_REPORTING_ACTIVITY_MASTER")
class ReportingActivity: AbstractStandardEntity() {
    var category: String? =null
    var displayOrder: Int? = null
    var isActive: Boolean? = null
    var duration: Double? = null
}