package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "mtpln", tableName = "RPT_MONTHLY_PLAN")
class MonthlyPlan: AbstractAuditableEntity() {
    var yearMonth: Int? = null
    var year: Int? = null
    var location: NamedSquerId? = null
    var employee: NamedSquerId? = null
    var status: NamedSquerId? = null // plan status - plan created or not
}