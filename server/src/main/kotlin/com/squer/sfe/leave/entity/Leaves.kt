package com.squer.sfe.leave.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import org.exolab.castor.types.Date
import org.exolab.castor.types.DateTime

@EntityMeta(prefix = "leave", tableName = "LEV_LEAVES_APPLIED")
class Leaves: AbstractAuditableEntity() {
    var owner: NamedSquerId? = null
    var leaveType: NamedSquerId? = null
    var fromDate: Int? = null
    var toDate: Int? = null
    var actualLeavesDays: Int? = null
    var reason: String? = null
    var appliedAgainstType: NamedSquerId? = null
    var status: NamedSquerId? = null
    var actionBy: NamedSquerId? = null
}