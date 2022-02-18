package com.squer.sfe.expense.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix="expaa", tableName = "EXP_EXPENSE_APPROVAL_AMOUNT")
class ExpenseApprovalAmount: AbstractAuditableEntity() {
    lateinit var expense: SquerId
    lateinit var manager: NamedSquerId
    var allowanceCategory: NamedSquerId? = null
    var amountClaimed: Double = 0.0
    var amountAdded: Double = 0.0
    var amountDeducted: Double = 0.0
    var amountApproved: Double = 0.0
    var remarks: String? = null
    lateinit var chain: SquerId
    lateinit var status: String
    lateinit var jobRole: NamedSquerId
}