package com.squer.sfe.expense.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "expmt", tableName = "EXP_EXPENSE_MASTER")
class ExpenseMaster: AbstractAuditableEntity() {
    var employee: NamedSquerId? = null
    var location: NamedSquerId? = null
    var locationType: NamedSquerId? = null
    var year: Int? = null
    var month: Int? = null
    var yyyyMm: Int? = null
    var currentlyApprovedBy: NamedSquerId? = null
    var status: NamedSquerId? = null
    var displayStatus: String = "Draft"
    var employeeCode: String = ""
}