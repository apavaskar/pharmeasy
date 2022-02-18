package com.squer.sfe.reporting.service

import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.VisitDetailing
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.reporting.entity.VisitRcpa
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class VisitDetailingService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): VisitDetailing {
        val searchCriteria = SearchCriteria(ReportingQueryName.VDETL_SELECT.query)
        searchCriteria.addCondition("vdetl_id", id)
        return repository.find(searchCriteria).filterIsInstance<VisitDetailing>().first()
    }

    fun create(entity: VisitDetailing): VisitDetailing {
        return repository.create(entity) as VisitDetailing
    }

    fun update(entity: VisitDetailing): VisitDetailing {
        return repository.update(entity) as VisitDetailing
    }

    fun findByParams(valueMap: Map<String,Any>): List<VisitDetailing> {
            val searchCriteria = SearchCriteria(ReportingQueryName.VDETL_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<VisitDetailing>()
        }


    fun deactivateDetailingById(detailingId: String): VisitDetailing{
        var detailing = findById(detailingId)
        try{
            detailing.isActive = false
            return repository.update(detailing) as VisitDetailing
        }catch (e: Exception){
            throw e
        }
    }

    fun updateSequence(attendeeId: String): Boolean{
        try {
            var valueMap = mutableMapOf<String,Any>()
            valueMap.put("vdetl_attendee_id",attendeeId)
            valueMap.put("vdetl_is_active",true)
            var detailingList = findByParams(valueMap)
            var seq = 1
            detailingList.forEach {
                it.sequence = 1
                update(it)
            }
            return true
        }catch (e: Exception){
            throw e
        }
    }

}