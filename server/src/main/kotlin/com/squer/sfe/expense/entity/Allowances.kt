package com.squer.sfe.expense.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "alwnc", tableName = "EXP_EXPENSE_ALLOWANCES")
class Allowances: AbstractAuditableEntity() {
    var allowanceName: NamedSquerId? = null
    var expenseType: NamedSquerId? = null // allowance/fare/sundries/misc
    var locationType: NamedSquerId? = null // hq, ex-hq
    var division: NamedSquerId? = null
    var jobTitle: NamedSquerId? = null
    var townCategory: NamedSquerId? = null
    var minRequiredLimit: Double? = null
    var maxRequiredLimit: Double? = null
    var value: Double? = null
    var maxValue: Double? = null
    var validFrom: Int? = null
    var validTo: Int? = null
    var category: NamedSquerId? = null // for approval categories
    var periodCategory: NamedSquerId? = null // daily, monthly
    var isDocumentRequired: Boolean? = null
    var isEditable: Boolean? = null
    var isActive: Boolean? = null
}