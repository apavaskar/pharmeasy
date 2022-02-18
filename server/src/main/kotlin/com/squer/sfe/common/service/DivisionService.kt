package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Division
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class DivisionService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): Division {
        val searchCriteria = SearchCriteria(CommonQueryName.DIVSN_SELECT.query)
        searchCriteria.addCondition("divsn_id", id)
        return repository.find(searchCriteria).filterIsInstance<Division>().first()
    }

    fun create(entity: Division): Division {
        return repository.create(entity) as Division
    }

    fun update(entity: Division): Division {
        return repository.update(entity) as Division
    }

    fun findByParams(valueMap: Map<String,Any>): List<Division> {
        val searchCriteria = SearchCriteria(CommonQueryName.DIVSN_SELECT.query)
        valueMap.forEach {
            searchCriteria.addCondition(it.key, it.value)
        }
        return repository.find(searchCriteria).filterIsInstance<Division>()
    }
}