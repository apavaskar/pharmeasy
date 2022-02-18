package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.EmployeeProfile
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class EmployeeHistoryService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): EmployeeProfile {
        val searchCriteria = SearchCriteria(CommonQueryName.EMPHS_SELECT.query)
        searchCriteria.addCondition("emphs_id", id)
        return repository.find(searchCriteria).filterIsInstance<EmployeeProfile>().first()
    }

    fun create(entity: EmployeeProfile): EmployeeProfile {
        return repository.create(entity) as EmployeeProfile
    }

    fun update(entity: EmployeeProfile): EmployeeProfile {
        return repository.update(entity) as EmployeeProfile
    }
}