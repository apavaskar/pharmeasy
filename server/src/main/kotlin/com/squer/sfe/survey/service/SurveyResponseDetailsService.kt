package com.squer.sfe.survey.service

import com.squer.sfe.survey.SurveyQueryName
import com.squer.sfe.survey.entity.SurveyResponseDetails
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SurveyResponseDetailsService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): SurveyResponseDetails {
        val searchCriteria = SearchCriteria(SurveyQueryName.SRVRD_SELECT.query)
        searchCriteria.addCondition("srvrd_id", id)
        return repository.find(searchCriteria).filterIsInstance<SurveyResponseDetails>().first()
    }

    fun create(entity: SurveyResponseDetails): SurveyResponseDetails {
        return repository.create(entity) as SurveyResponseDetails
    }

    fun update(entity: SurveyResponseDetails): SurveyResponseDetails {
        return repository.update(entity) as SurveyResponseDetails
    }

    fun findByParams(valueMap: Map<String,Any>): List<SurveyResponseDetails> {
            val searchCriteria = SearchCriteria(SurveyQueryName.SRVRD_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<SurveyResponseDetails>()
        }
}