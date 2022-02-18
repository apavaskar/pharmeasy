package com.squer.sfe.edetailing.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "dtlin", tableName = "DTL_DETAILING_ADDITIONAL_INFO")
class DetailingAdditionalInfo: AbstractAuditableEntity() {
    var detailingMaster: SquerId? = null
    var remarks: String? = null
}