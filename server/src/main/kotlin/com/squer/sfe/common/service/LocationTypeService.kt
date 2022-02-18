package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.LocationType
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class LocationTypeService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): LocationType {
        val searchCriteria = SearchCriteria(CommonQueryName.LOCTT_SELECT.query)
        searchCriteria.addCondition("loctt_id", id)
        return repository.find(searchCriteria).filterIsInstance<LocationType>().first()
    }

    fun create(entity: LocationType): LocationType {
        return repository.create(entity) as LocationType
    }

    fun update(entity: LocationType): LocationType {
        return repository.update(entity) as LocationType
    }
}