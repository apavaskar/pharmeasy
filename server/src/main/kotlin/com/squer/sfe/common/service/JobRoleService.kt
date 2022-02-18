package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.JobRole
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class JobRoleService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): JobRole {
        val searchCriteria = SearchCriteria(CommonQueryName.JOBRL_SELECT.query)
        searchCriteria.addCondition("jobrl_id", id)
        return repository.find(searchCriteria).filterIsInstance<JobRole>().first()
    }

    fun create(entity: JobRole): JobRole {
        return repository.create(entity) as JobRole
    }

    fun update(entity: JobRole): JobRole {
        return repository.update(entity) as JobRole
    }
}