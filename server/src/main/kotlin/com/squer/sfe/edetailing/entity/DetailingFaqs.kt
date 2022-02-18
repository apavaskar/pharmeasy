package com.squer.sfe.edetailing.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "dtlfq", tableName = "DTL_DETAILING_FAQ")
class DetailingFaqs: AbstractAuditableEntity() {
    var detailStat: SquerId? = null
    var question: String? = null
    var answer: String? = null
}