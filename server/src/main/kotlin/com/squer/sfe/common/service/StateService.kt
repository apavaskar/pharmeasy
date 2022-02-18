package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.State
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class StateService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): State {
        val searchCriteria = SearchCriteria(CommonQueryName.STATE_SELECT.query)
        searchCriteria.addCondition("state_id", id)
        return repository.find(searchCriteria).filterIsInstance<State>().first()
    }

    fun create(entity: State): State {
        return repository.create(entity) as State
    }

    fun update(entity: State): State {
        return repository.update(entity) as State
    }
}