package com.squer.sfe.survey.service

import com.squer.sfe.survey.SurveyQueryName
import com.squer.sfe.survey.entity.SurveyQuestion
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SurveyQuestionService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): SurveyQuestion {
        val searchCriteria = SearchCriteria(SurveyQueryName.SRQUE_SELECT.query)
        searchCriteria.addCondition("srque_id", id)
        return repository.find(searchCriteria).filterIsInstance<SurveyQuestion>().first()
    }

    fun create(entity: SurveyQuestion): SurveyQuestion {
        return repository.create(entity) as SurveyQuestion
    }

    fun update(entity: SurveyQuestion): SurveyQuestion {
        return repository.update(entity) as SurveyQuestion
    }

    fun findByParams(valueMap: Map<String,Any>): List<SurveyQuestion> {
            val searchCriteria = SearchCriteria(SurveyQueryName.SRQUE_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<SurveyQuestion>()
        }
}