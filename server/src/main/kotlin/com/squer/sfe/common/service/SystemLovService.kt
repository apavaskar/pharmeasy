package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.SystemLov
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SystemLovService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): SystemLov {
        val searchCriteria = SearchCriteria(CommonQueryName.SYSLV_SELECT.query)
        searchCriteria.addCondition("syslv_id", id)
        return repository.find(searchCriteria).filterIsInstance<SystemLov>().first()
    }

    fun create(entity: SystemLov): SystemLov {
        return repository.create(entity) as SystemLov
    }

    fun update(entity: SystemLov): SystemLov {
        return repository.update(entity) as SystemLov
    }

    fun findByParams(valueMap: Map<String,String>): List<SystemLov> {
        val searchCriteria = SearchCriteria(CommonQueryName.SYSLV_SELECT.query)
        valueMap.forEach{
            searchCriteria.addCondition(it.key, it.value)
        }
        searchCriteria.orderBy = "ORDER BY syslv_display_order asc"
        return repository.find(searchCriteria).filterIsInstance<SystemLov>()
    }
}