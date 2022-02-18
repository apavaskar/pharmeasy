package com.squer.sfe.reports

import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Location

open class DrilldownReport {

    fun getImmediateChildLocations(locationId: String, repository: SquerRepository): List<Location> {
        val location = repository.restore(SquerId(locationId)) as Location
        if (location.type?.id == "loctt00000000000000000000000000000003") {
            var locations = mutableListOf<Location>()
            locations.add(location)
            return locations
        }
        val locationCriteria = SearchCriteria(CommonQueryName.LOCAT_SELECT.query)
        locationCriteria.addCondition("locat_parent_id", locationId)
        return repository.find(locationCriteria) as List<Location>
    }

    fun getAllLocationsForDivision(divisionId: String, repository: SquerRepository): List<Location> {
        val locationCriteria = SearchCriteria(CommonQueryName.LOCAT_SELECT.query)
        locationCriteria.addCondition("locat_division_id", divisionId)
        locationCriteria.addCondition("locat_is_active", true)
        return repository.find(locationCriteria).filterIsInstance<Location>()
    }

    fun getDoctorClassificationsForDivision(divisionId: String, repository: SquerRepository): List<Map<String, Any>> {
        val classificationCriteria = SearchCriteria(CommonQueryName.DML_CLASSIFICATION_SELECT.query)
        classificationCriteria.addCondition("locat_division_id", divisionId)
        classificationCriteria.addCondition("doctr_is_active", true)
        return repository.find(classificationCriteria).filterIsInstance<Map<String, Any>>()
    }

}