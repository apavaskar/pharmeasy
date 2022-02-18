package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Town
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class TownService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): Town {
        val searchCriteria = SearchCriteria(CommonQueryName.TOWNS_SELECT.query)
        searchCriteria.addCondition("towns_id", id)
        return repository.find(searchCriteria).filterIsInstance<Town>().first()
    }

    fun create(entity: Town): Town {
        return repository.create(entity) as Town
    }

    fun update(entity: Town): Town {
        return repository.update(entity) as Town
    }

    fun getLocationTown(locationId: String): Town{
        val searchCriteria = SearchCriteria(CommonQueryName.LOCATION_TOWN_SELECT.query)
        searchCriteria.addCondition("locationId", locationId)
        return repository.find(searchCriteria).filterIsInstance<Town>().first()
    }
}