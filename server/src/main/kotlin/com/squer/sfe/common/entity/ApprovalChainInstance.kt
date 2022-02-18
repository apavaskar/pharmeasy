package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import java.util.*
import kotlin.properties.Delegates

@EntityMeta(prefix = "aprci", tableName = "CMT_APPROVAL_CHAIN_INSTANCE")
class ApprovalChainInstance  : AbstractAuditableEntity() {
    lateinit var owner: SquerId
    lateinit var chainType: String
    lateinit var approver: NamedSquerId
    var jobTitle: NamedSquerId? = null
    var approverLevel by Delegates.notNull<Int>()
    lateinit var approvalStatus: String
    lateinit var receivedOn: Date
    var actionOn: Date? = null
    var yyyyMm by Delegates.notNull<Int>()
    var yyyyMmDd by Delegates.notNull<Int>()
}


