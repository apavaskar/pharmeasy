package com.squer.sfe.custom.wockhardt.service

import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.custom.wockhardt.WCCustomQueryName
import com.squer.sfe.custom.wockhardt.entity.SFCMaster
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class WCSFCService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findByLocation(locationId: String): List<SFCMaster> {
        var criteria = SearchCriteria(WCCustomQueryName.WCSFC_SELECT.query)
        criteria.addCondition("wcsfc_location_id", locationId)
        return repository.find(criteria).filterIsInstance<SFCMaster>()
    }

    fun updateDistance(id: String, distance: Double): Boolean {
        try {
            val sfcMaster = repository.restore(SquerId(id)) as SFCMaster
            sfcMaster.correctedDistance = distance
            repository.update(sfcMaster)
            return true
        }catch (e: Exception) {
            e.printStackTrace()
            return false
        }
    }

    fun createDistance(sfcMaster: SFCMaster): SFCMaster {
        try {
            return repository.create(sfcMaster) as SFCMaster
        }catch (e: Exception) {
            e.printStackTrace()
            throw e
        }
    }
}