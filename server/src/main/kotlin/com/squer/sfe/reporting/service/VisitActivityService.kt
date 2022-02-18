package com.squer.sfe.reporting.service

import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.VisitActivity
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class VisitActivityService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): VisitActivity {
        val searchCriteria = SearchCriteria(ReportingQueryName.VACTV_SELECT.query)
        searchCriteria.addCondition("vactv_id", id)
        return repository.find(searchCriteria).filterIsInstance<VisitActivity>().first()
    }

    fun create(entity: VisitActivity): VisitActivity {
        return repository.create(entity) as VisitActivity
    }

    fun update(entity: VisitActivity): VisitActivity {
        return repository.update(entity) as VisitActivity
    }

    fun findByParams(valueMap: Map<String,Any>): List<VisitActivity> {
            val searchCriteria = SearchCriteria(ReportingQueryName.VACTV_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<VisitActivity>()
        }
}