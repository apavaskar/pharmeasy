package com.squer.sfe.expense.controller

import com.squer.sfe.expense.entity.ExpenseDetails
import com.squer.sfe.expense.service.ExpenseDetailsService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/expensedetails")
@RestController
class ExpenseDetailsController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: ExpenseDetailsService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): ExpenseDetails {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PostMapping("/create")
    fun createEntity(@RequestBody entity: ExpenseDetails): ExpenseDetails {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: ExpenseDetails): ExpenseDetails {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: String): Boolean {
        val detail = repository.restore(SquerId(id)) as ExpenseDetails
        val details = mutableListOf<ExpenseDetails>()
        details.add(detail)
        return entityService.deleteExpenseDetails(details)
    }
}