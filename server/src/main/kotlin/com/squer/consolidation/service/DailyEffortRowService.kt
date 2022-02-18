package com.squer.consolidation.service

import com.squer.consolidation.ConsolidationQueryName
import com.squer.consolidation.effort.DailyEffortRow
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class DailyEffortRowService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): DailyEffortRow {
        val searchCriteria = SearchCriteria(ConsolidationQueryName.DEFFR_SELECT.query)
        searchCriteria.addCondition("deffr_id", id)
        return repository.find(searchCriteria).filterIsInstance<DailyEffortRow>().first()
    }

    fun create(entity: DailyEffortRow): DailyEffortRow {
        return repository.create(entity) as DailyEffortRow
    }

    fun update(entity: DailyEffortRow): DailyEffortRow {
        return repository.update(entity) as DailyEffortRow
    }

    fun findByParams(valueMap: Map<String,Any>): List<DailyEffortRow> {
            val searchCriteria = SearchCriteria(ConsolidationQueryName.DEFFR_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<DailyEffortRow>()
        }
}