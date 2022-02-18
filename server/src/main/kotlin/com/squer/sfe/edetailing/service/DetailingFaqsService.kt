package com.squer.sfe.edetailing.service

import com.squer.sfe.edetailing.EdetailingQueryName
import com.squer.sfe.edetailing.entity.DetailingFaqs
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class DetailingFaqsService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): DetailingFaqs {
        val searchCriteria = SearchCriteria(EdetailingQueryName.DTLFQ_SELECT.query)
        searchCriteria.addCondition("dtlfq_id", id)
        return repository.find(searchCriteria).filterIsInstance<DetailingFaqs>().first()
    }

    fun create(entity: DetailingFaqs): DetailingFaqs {
        return repository.create(entity) as DetailingFaqs
    }

    fun update(entity: DetailingFaqs): DetailingFaqs {
        return repository.update(entity) as DetailingFaqs
    }

    fun findByParams(valueMap: Map<String,Any>): List<DetailingFaqs> {
            val searchCriteria = SearchCriteria(EdetailingQueryName.DTLFQ_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<DetailingFaqs>()
        }
}