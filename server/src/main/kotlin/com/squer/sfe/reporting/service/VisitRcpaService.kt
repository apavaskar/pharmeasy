package com.squer.sfe.reporting.service

import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.VisitRcpa
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class VisitRcpaService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): VisitRcpa {
        val searchCriteria = SearchCriteria(ReportingQueryName.VRCPA_SELECT.query)
        searchCriteria.addCondition("vrcpa_id", id)
        return repository.find(searchCriteria).filterIsInstance<VisitRcpa>().first()
    }

    fun create(entity: VisitRcpa): VisitRcpa {
        return repository.create(entity) as VisitRcpa
    }

    fun update(entity: VisitRcpa): VisitRcpa {
        return repository.update(entity) as VisitRcpa
    }

    fun findByParams(valueMap: Map<String,Any>): List<VisitRcpa> {
            val searchCriteria = SearchCriteria(ReportingQueryName.VRCPA_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<VisitRcpa>()
        }

    fun deactivateRCPAById(rcpaId: String): VisitRcpa{
        var rcpa = findById(rcpaId)
        try{
            rcpa.isActive = false
            return repository.update(rcpa) as VisitRcpa
        }catch (e: Exception){
            throw e
        }
    }
}