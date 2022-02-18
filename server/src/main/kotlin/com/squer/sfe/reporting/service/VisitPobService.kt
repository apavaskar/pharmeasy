package com.squer.sfe.reporting.service

import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.VisitPob
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class VisitPobService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): VisitPob {
        val searchCriteria = SearchCriteria(ReportingQueryName.VTPOB_SELECT.query)
        searchCriteria.addCondition("vtpob_id", id)
        return repository.find(searchCriteria).filterIsInstance<VisitPob>().first()
    }

    fun create(entity: VisitPob): VisitPob {
        return repository.create(entity) as VisitPob
    }

    fun update(entity: VisitPob): VisitPob {
        return repository.update(entity) as VisitPob
    }

    fun findByParams(valueMap: Map<String,Any>): List<VisitPob> {
            val searchCriteria = SearchCriteria(ReportingQueryName.VTPOB_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<VisitPob>()
        }
}