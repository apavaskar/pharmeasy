package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "vrcpa", tableName = "RPT_VISIT_RCPA")
class VisitRcpa: AbstractAuditableEntity() {
    var attendee: SquerId? = null
    var chemist: NamedSquerId? = null
    var doctor: NamedSquerId? = null
    var brand: NamedSquerId? = null
    var product: NamedSquerId? = null
    var quantity: Int? = null
    var rxn: Int? = null
    var value: Double? = null
    var competitionQuantity: Int? = null
    var competitionRxn: Int? = null
    var competitionValue: Double? = null
    var type: NamedSquerId? = null //
    var isActive: Boolean? = null
}