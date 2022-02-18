package com.squer.sfe.survey.service

import com.squer.sfe.survey.SurveyQueryName
import com.squer.sfe.survey.entity.SurveyAnswers
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SurveyAnswersService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): SurveyAnswers {
        val searchCriteria = SearchCriteria(SurveyQueryName.SRANS_SELECT.query)
        searchCriteria.addCondition("srans_id", id)
        return repository.find(searchCriteria).filterIsInstance<SurveyAnswers>().first()
    }

    fun create(entity: SurveyAnswers): SurveyAnswers {
        return repository.create(entity) as SurveyAnswers
    }

    fun update(entity: SurveyAnswers): SurveyAnswers {
        return repository.update(entity) as SurveyAnswers
    }

    fun findByParams(valueMap: Map<String,Any>): List<SurveyAnswers> {
            val searchCriteria = SearchCriteria(SurveyQueryName.SRANS_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<SurveyAnswers>()
        }
}