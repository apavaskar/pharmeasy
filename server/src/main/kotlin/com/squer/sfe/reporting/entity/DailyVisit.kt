package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import java.util.*

@EntityMeta(prefix = "dtvst", tableName = "RPT_DAILY_VISIT")
class DailyVisit: AbstractAuditableEntity() {
    var plan: SquerId? = null
    var location: NamedSquerId? = null
    var employee: NamedSquerId? = null
    var visitDate: Date? =null
    var yyyyMm: Int? = null
    var yyyyMmDD: Int? = null
    var activityType: NamedSquerId? = null
    var duration: Double? = null
}