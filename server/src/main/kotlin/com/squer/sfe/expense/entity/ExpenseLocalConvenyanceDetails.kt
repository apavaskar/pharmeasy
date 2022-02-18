package com.squer.sfe.expense.entity

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.business.entity.SquerId
import kotlin.properties.Delegates

@EntityMeta(prefix = "elcal", tableName = "EXP_LOCAL_CONVEYANCE_ALLOWANCE")
class ExpenseLocalConvenyanceDetails: SquerEntity() {
    lateinit var expenseDetail: SquerId
    lateinit var transportMode: String
    lateinit var fromTown: String
    lateinit var toTown: String
    var fare by Delegates.notNull<Double>()
}