package com.squer.sfe.expense.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "expdt", tableName = "EXP_EXPENSE_DETAILS")
class ExpenseDetails: AbstractAuditableEntity() {
    var expense: SquerId? =null
    var employee: NamedSquerId? = null
    var location: NamedSquerId? = null
    var yyyyMm: Int? = null
    var yyyyMmDd: Int? = null
    var expenseType: NamedSquerId? = null
    var locationType: NamedSquerId? = null
    var amount: Double? = null
    var remarks: String? = null
}