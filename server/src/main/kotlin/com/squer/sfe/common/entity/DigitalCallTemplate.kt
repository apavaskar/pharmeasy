package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "dictm", tableName = "CMT_DIGITAL_CALL_TEMPLATES")
class DigitalCallTemplate: AbstractAuditableEntity() {
    var brand: NamedSquerId? = null
    var callType: NamedSquerId? = null
    var templateText: String? = null
    var isActive: Boolean? = null
}