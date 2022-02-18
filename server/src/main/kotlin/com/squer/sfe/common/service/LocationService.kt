package com.squer.sfe.common.service

import com.squer.platform.business.entity.SquerId
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Location
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class LocationService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): Location {
        val searchCriteria = SearchCriteria(CommonQueryName.LOCAT_SELECT.query)
        searchCriteria.addCondition("locat_id", id)
        return repository.find(searchCriteria).filterIsInstance<Location>().first()
    }

    fun create(entity: Location): Location {
        return repository.create(entity) as Location
    }

    fun update(entity: Location): Location {
        return repository.update(entity) as Location
    }

    fun getLocationHierarchy(searchId: String): List<Location>{
        if(SquerId(searchId).getPrefix() == "locat"){
            var searchCriteria = SearchCriteria(CommonQueryName.LOCATION_HIERARCHY_SELECT.query)
            searchCriteria.addCondition("locationId",searchId)
            return repository.find(searchCriteria).filterIsInstance<Location>()
        }else if(SquerId(searchId).getPrefix() == "divsn"){
            var searchCriteria = SearchCriteria(CommonQueryName.LOCAT_SELECT.query)
            searchCriteria.addCondition("locat_division_id",searchId)
            return repository.find(searchCriteria).filterIsInstance<Location>()
        }else{
            throw Exception("INVALID ID PASSED")
        }
    }
}