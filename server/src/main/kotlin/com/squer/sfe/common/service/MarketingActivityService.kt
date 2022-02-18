package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.MarketingActivity
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class MarketingActivityService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): MarketingActivity {
        val searchCriteria = SearchCriteria(CommonQueryName.MRACT_SELECT.query)
        searchCriteria.addCondition("mract_id", id)
        return repository.find(searchCriteria).filterIsInstance<MarketingActivity>().first()
    }

    fun create(entity: MarketingActivity): MarketingActivity {
        return repository.create(entity) as MarketingActivity
    }

    fun update(entity: MarketingActivity): MarketingActivity {
        return repository.update(entity) as MarketingActivity
    }

    fun findByParams(valueMap: Map<String,Any>): List<MarketingActivity> {
            val searchCriteria = SearchCriteria(CommonQueryName.MRACT_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<MarketingActivity>()
        }

    fun findByLocation(locationId:String, isActive: Boolean): List<MarketingActivity> {
        val searchCriteria = SearchCriteria(CommonQueryName.LOCATION_MARKETING_ACTIVITY_SELECT.query)
        searchCriteria.addCondition("locationId",locationId)
        searchCriteria.addCondition("isActive",isActive)
        return repository.find(searchCriteria).filterIsInstance<MarketingActivity>()
    }
}