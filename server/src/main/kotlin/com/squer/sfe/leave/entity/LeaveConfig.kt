package com.squer.sfe.leave.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "lvcfg", tableName = "LEV_LEAVE_CONFIG")
class LeaveConfig: AbstractAuditableEntity() {
    var leaveType: NamedSquerId? = null
    var totalCount: Int? = null
    var applyInAdvance: Int? = null
    var accumulate: Int? = null
    var encashable: Int? = null
    var minDays: Int? = null
    var maxDays: Int? = null
    var carryForward: Int? = null
}
