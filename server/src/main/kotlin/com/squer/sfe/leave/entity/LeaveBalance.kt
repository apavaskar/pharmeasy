package com.squer.sfe.leave.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import java.util.*

@EntityMeta(prefix = "lvblc", tableName = "LEV_LEAVE_BALANCE")
class LeaveBalance: AbstractAuditableEntity() {
    var employee: NamedSquerId? = null
    var leaveType: NamedSquerId? = null
    var fromDate: Int?= null
    var toDate: Int? = null
    var validFrom: Int? = null
    var opening: Double? = null
    var consumed: Double? = null
    var balance: Double? = null
    var adjusted: Double? = null
}