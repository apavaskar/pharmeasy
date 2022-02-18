package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Beat
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class BeatService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): Beat {
        val searchCriteria = SearchCriteria(CommonQueryName.BEATS_SELECT.query)
        searchCriteria.addCondition("beats_id", id)
        return repository.find(searchCriteria).filterIsInstance<Beat>().first()
    }

    fun create(entity: Beat): Beat {
        return repository.create(entity) as Beat
    }

    fun update(entity: Beat): Beat {
        return repository.update(entity) as Beat
    }

    fun findByLocation(locationId: String): List<Beat> {
        val searchCriteria = SearchCriteria(CommonQueryName.BEATS_SELECT.query)
        searchCriteria.addCondition("beats_location_id", locationId)
        searchCriteria.addCondition("beats_is_active", true)
        return repository.find(searchCriteria).filterIsInstance<Beat>()
    }
}