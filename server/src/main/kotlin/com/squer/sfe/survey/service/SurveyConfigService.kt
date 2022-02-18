package com.squer.sfe.survey.service

import com.squer.sfe.survey.SurveyQueryName
import com.squer.sfe.survey.entity.SurveyConfig
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SurveyConfigService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): SurveyConfig {
        val searchCriteria = SearchCriteria(SurveyQueryName.SRCFG_SELECT.query)
        searchCriteria.addCondition("srcfg_id", id)
        return repository.find(searchCriteria).filterIsInstance<SurveyConfig>().first()
    }

    fun create(entity: SurveyConfig): SurveyConfig {
        return repository.create(entity) as SurveyConfig
    }

    fun update(entity: SurveyConfig): SurveyConfig {
        return repository.update(entity) as SurveyConfig
    }

    fun findByParams(valueMap: Map<String,Any>): List<SurveyConfig> {
            val searchCriteria = SearchCriteria(SurveyQueryName.SRCFG_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<SurveyConfig>()
        }
}