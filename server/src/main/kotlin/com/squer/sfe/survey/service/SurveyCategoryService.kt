package com.squer.sfe.survey.service

import com.squer.sfe.survey.SurveyQueryName
import com.squer.sfe.survey.entity.SurveyCategory
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SurveyCategoryService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): SurveyCategory {
        val searchCriteria = SearchCriteria(SurveyQueryName.SRCAT_SELECT.query)
        searchCriteria.addCondition("srcat_id", id)
        return repository.find(searchCriteria).filterIsInstance<SurveyCategory>().first()
    }

    fun create(entity: SurveyCategory): SurveyCategory {
        return repository.create(entity) as SurveyCategory
    }

    fun update(entity: SurveyCategory): SurveyCategory {
        return repository.update(entity) as SurveyCategory
    }

    fun findByParams(valueMap: Map<String,Any>): List<SurveyCategory> {
            val searchCriteria = SearchCriteria(SurveyQueryName.SRCAT_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<SurveyCategory>()
        }
}