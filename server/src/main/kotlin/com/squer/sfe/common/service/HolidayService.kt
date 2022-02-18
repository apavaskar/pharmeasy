package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Holiday
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class HolidayService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): Holiday {
        val searchCriteria = SearchCriteria(CommonQueryName.HOLDY_SELECT.query)
        searchCriteria.addCondition("holdy_id", id)
        return repository.find(searchCriteria).filterIsInstance<Holiday>().first()
    }

    fun create(entity: Holiday): Holiday {
        return repository.create(entity) as Holiday
    }

    fun update(entity: Holiday): Holiday {
        return repository.update(entity) as Holiday
    }

    fun findByParams(valueMap: Map<String,Any>): List<Holiday> {
            val searchCriteria = SearchCriteria(CommonQueryName.HOLDY_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<Holiday>()
        }
}