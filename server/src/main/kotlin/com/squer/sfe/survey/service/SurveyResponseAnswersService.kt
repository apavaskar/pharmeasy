package com.squer.sfe.survey.service

import com.squer.sfe.survey.SurveyQueryName
import com.squer.sfe.survey.entity.SurveyResponseAnswers
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SurveyResponseAnswersService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): SurveyResponseAnswers {
        val searchCriteria = SearchCriteria(SurveyQueryName.SRVAN_SELECT.query)
        searchCriteria.addCondition("srvan_id", id)
        return repository.find(searchCriteria).filterIsInstance<SurveyResponseAnswers>().first()
    }

    fun create(entity: SurveyResponseAnswers): SurveyResponseAnswers {
        return repository.create(entity) as SurveyResponseAnswers
    }

    fun update(entity: SurveyResponseAnswers): SurveyResponseAnswers {
        return repository.update(entity) as SurveyResponseAnswers
    }

    fun findByParams(valueMap: Map<String,Any>): List<SurveyResponseAnswers> {
            val searchCriteria = SearchCriteria(SurveyQueryName.SRVAN_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<SurveyResponseAnswers>()
        }
}