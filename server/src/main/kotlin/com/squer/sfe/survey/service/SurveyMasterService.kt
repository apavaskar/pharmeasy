package com.squer.sfe.survey.service

import com.squer.sfe.survey.SurveyQueryName
import com.squer.sfe.survey.entity.SurveyMaster
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SurveyMasterService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): SurveyMaster {
        val searchCriteria = SearchCriteria(SurveyQueryName.SURVY_SELECT.query)
        searchCriteria.addCondition("survy_id", id)
        return repository.find(searchCriteria).filterIsInstance<SurveyMaster>().first()
    }

    fun create(entity: SurveyMaster): SurveyMaster {
        return repository.create(entity) as SurveyMaster
    }

    fun update(entity: SurveyMaster): SurveyMaster {
        return repository.update(entity) as SurveyMaster
    }

    fun findByParams(valueMap: Map<String,Any>): List<SurveyMaster> {
            val searchCriteria = SearchCriteria(SurveyQueryName.SURVY_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<SurveyMaster>()
        }
}