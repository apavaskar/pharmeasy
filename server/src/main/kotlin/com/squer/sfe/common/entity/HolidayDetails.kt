package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "hldtl", tableName = "CMT_HOLIDAY_DETAILS")
class HolidayDetails: AbstractAuditableEntity() {
    var holiday: NamedSquerId? = null
    var state: NamedSquerId? = null
    var jobRole: NamedSquerId? = null
    var year: Int? = null
    var yyyyMM: Int? = null
    var yyyyMmDd: Int? = null
}