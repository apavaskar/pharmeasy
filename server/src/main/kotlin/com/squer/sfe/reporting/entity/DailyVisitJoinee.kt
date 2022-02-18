package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.*

@EntityMeta(prefix = "dtvje", tableName = "RPT_DAILY_VISIT_JOINEE")
class DailyVisitJoinee: AbstractAuditableEntity(){
    var attendee: SquerId? = null
    var manager: NamedSquerId? = null
    var isActive: Boolean? = null
    var status: NamedSquerId? = null
}