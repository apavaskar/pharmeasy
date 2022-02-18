package com.squer.consolidation.service

import com.squer.consolidation.ConsolidationQueryName
import com.squer.consolidation.effort.MonthlyEffortRow
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class MonthlyEffortRowService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): MonthlyEffortRow {
        val searchCriteria = SearchCriteria(ConsolidationQueryName.MEFFR_SELECT.query)
        searchCriteria.addCondition("meffr_id", id)
        return repository.find(searchCriteria).filterIsInstance<MonthlyEffortRow>().first()
    }

    fun create(entity: MonthlyEffortRow): MonthlyEffortRow {
        return repository.create(entity) as MonthlyEffortRow
    }

    fun update(entity: MonthlyEffortRow): MonthlyEffortRow {
        return repository.update(entity) as MonthlyEffortRow
    }

    fun findByParams(valueMap: Map<String,Any>): List<MonthlyEffortRow> {
            val searchCriteria = SearchCriteria(ConsolidationQueryName.MEFFR_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<MonthlyEffortRow>()
        }
}