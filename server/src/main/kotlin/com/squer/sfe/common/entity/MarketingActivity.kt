package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "mract", tableName = "CMT_MARKETING_ACTIVITY_MASTER")
class MarketingActivity: AbstractStandardEntity() {
    var division: NamedSquerId? = null
    var isActive: Boolean? = null
    var inClinicActivity: Boolean? = null
}