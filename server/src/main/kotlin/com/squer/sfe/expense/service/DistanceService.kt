package com.squer.sfe.expense.service

import com.squer.sfe.expense.ExpenseQueryName
import com.squer.sfe.expense.entity.Distance
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class DistanceService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): Distance {
        val searchCriteria = SearchCriteria(ExpenseQueryName.DISTN_SELECT.query)
        searchCriteria.addCondition("distn_id", id)
        return repository.find(searchCriteria).filterIsInstance<Distance>().first()
    }

    fun create(entity: Distance): Distance {
        return repository.create(entity) as Distance
    }

    fun update(entity: Distance): Distance {
        return repository.update(entity) as Distance
    }

    fun findByParams(valueMap: Map<String,Any>): List<Distance> {
            val searchCriteria = SearchCriteria(ExpenseQueryName.DISTN_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<Distance>()
        }
}