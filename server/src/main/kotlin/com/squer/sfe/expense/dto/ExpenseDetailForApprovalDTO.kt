package com.squer.sfe.expense.dto

import com.squer.sfe.common.entity.Employee
import com.squer.sfe.expense.entity.ExpenseDetails
import com.squer.sfe.expense.entity.ExpenseMaster

class ExpenseDetailForApprovalDTO {
    lateinit var id: String
    lateinit var master: ExpenseMaster
    lateinit var employee: Employee
    lateinit var details: List<ExpenseDetails>
}