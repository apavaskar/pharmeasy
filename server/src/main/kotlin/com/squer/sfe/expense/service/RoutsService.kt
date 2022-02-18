package com.squer.sfe.expense.service

import com.squer.sfe.expense.ExpenseQueryName
import com.squer.sfe.expense.entity.Routs
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class RoutsService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): Routs {
        val searchCriteria = SearchCriteria(ExpenseQueryName.ROUTS_SELECT.query)
        searchCriteria.addCondition("routs_id", id)
        return repository.find(searchCriteria).filterIsInstance<Routs>().first()
    }

    fun create(entity: Routs): Routs {
        return repository.create(entity) as Routs
    }

    fun update(entity: Routs): Routs {
        return repository.update(entity) as Routs
    }

    fun findByParams(valueMap: Map<String,Any>): List<Routs> {
            val searchCriteria = SearchCriteria(ExpenseQueryName.ROUTS_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<Routs>()
        }

    fun deleteRoutsForDay(expenseDetailId: String): Boolean{
        try {
            var valueMap = mutableMapOf<String, Any>()
            valueMap.put("routs_expense_detail_id", expenseDetailId)
            var routList = findByParams(valueMap)
            routList.forEach {
                repository.delete(it)
            }
            return true
        }catch (e: Exception){
            throw e
        }
    }
}