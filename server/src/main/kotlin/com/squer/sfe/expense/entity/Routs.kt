package com.squer.sfe.expense.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "routs", tableName = "EXP_EXPENSE_ROUTS")
class Routs: AbstractAuditableEntity() {
    var expenseDetail: SquerId? = null
    var fromTown: SquerId? = null
    var toTown: SquerId? = null
    var fromTownName: String? = null
    var toTownName: String? = null
    var transportMode: NamedSquerId? = null
    var distance: Double? = null
    var allownace: Double? = null
    var amount: Double? = null
    var isReturn: Boolean? = null
}