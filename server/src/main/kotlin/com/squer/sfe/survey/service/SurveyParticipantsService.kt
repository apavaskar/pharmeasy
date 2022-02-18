package com.squer.sfe.survey.service

import com.squer.sfe.survey.SurveyQueryName
import com.squer.sfe.survey.entity.SurveyParticipants
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SurveyParticipantsService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): SurveyParticipants {
        val searchCriteria = SearchCriteria(SurveyQueryName.SRPAT_SELECT.query)
        searchCriteria.addCondition("srpat_id", id)
        return repository.find(searchCriteria).filterIsInstance<SurveyParticipants>().first()
    }

    fun create(entity: SurveyParticipants): SurveyParticipants {
        return repository.create(entity) as SurveyParticipants
    }

    fun update(entity: SurveyParticipants): SurveyParticipants {
        return repository.update(entity) as SurveyParticipants
    }

    fun findByParams(valueMap: Map<String,Any>): List<SurveyParticipants> {
            val searchCriteria = SearchCriteria(SurveyQueryName.SRPAT_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<SurveyParticipants>()
        }
}