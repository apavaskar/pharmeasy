package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.DigitalCallTemplate
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class DigitalCallTemplateService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): DigitalCallTemplate {
        val searchCriteria = SearchCriteria(CommonQueryName.DICTM_SELECT.query)
        searchCriteria.addCondition("dictm_id", id)
        return repository.find(searchCriteria).filterIsInstance<DigitalCallTemplate>().first()
    }

    fun create(entity: DigitalCallTemplate): DigitalCallTemplate {
        return repository.create(entity) as DigitalCallTemplate
    }

    fun update(entity: DigitalCallTemplate): DigitalCallTemplate {
        return repository.update(entity) as DigitalCallTemplate
    }

    fun findByParams(valueMap: Map<String,Any>): List<DigitalCallTemplate> {
            val searchCriteria = SearchCriteria(CommonQueryName.DICTM_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<DigitalCallTemplate>()
        }
}