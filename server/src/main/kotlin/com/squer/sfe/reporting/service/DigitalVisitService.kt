package com.squer.sfe.reporting.service

import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.DigitalVisit
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class DigitalVisitService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): DigitalVisit {
        val searchCriteria = SearchCriteria(ReportingQueryName.DIGVS_SELECT.query)
        searchCriteria.addCondition("digvs_id", id)
        return repository.find(searchCriteria).filterIsInstance<DigitalVisit>().first()
    }

    fun create(entity: DigitalVisit): DigitalVisit {
        return repository.create(entity) as DigitalVisit
    }

    fun update(entity: DigitalVisit): DigitalVisit {
        return repository.update(entity) as DigitalVisit
    }

    fun findByParams(valueMap: Map<String,Any>): List<DigitalVisit> {
            val searchCriteria = SearchCriteria(ReportingQueryName.DIGVS_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<DigitalVisit>()
        }

    fun deactivateById(visitId: String):DigitalVisit{
        try{
            var visit = findById(visitId)
            visit.isActive = false
            return repository.update(visit) as DigitalVisit
        }catch (e:Exception){
            throw e
        }
    }

}