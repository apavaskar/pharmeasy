package com.squer.sfe.expense.service

import com.squer.sfe.expense.ExpenseQueryName
import com.squer.sfe.expense.entity.ExpenseDetails
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.service.DocumentService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ExpenseDetailsService {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var documentService: DocumentService

    @Autowired
    lateinit var routeService: RoutsService

    fun findById(id: String): ExpenseDetails {
        val searchCriteria = SearchCriteria(ExpenseQueryName.EXPDT_SELECT.query)
        searchCriteria.addCondition("expdt_id", id)
        return repository.find(searchCriteria).filterIsInstance<ExpenseDetails>().first()
    }

    fun create(entity: ExpenseDetails): ExpenseDetails {
        return repository.create(entity) as ExpenseDetails
    }

    fun update(entity: ExpenseDetails): ExpenseDetails {
        return repository.update(entity) as ExpenseDetails
    }

    fun findByParams(valueMap: Map<String,Any>): List<ExpenseDetails> {
            val searchCriteria = SearchCriteria(ExpenseQueryName.EXPDT_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<ExpenseDetails>()
        }

    fun deleteExpenseDetails(expenseDetailList: List<ExpenseDetails>):Boolean{
        try {
            expenseDetailList.forEach {
                documentService.deleteByOwner(it.id!!.id)
                routeService.deleteRoutsForDay(it.id!!.id)
                repository.delete(it)
            }
            return true
        }catch (e:Exception){
            throw e
        }
    }
}