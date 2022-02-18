package com.squer.sfe.reporting.service

import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.VisitMarketingActivityBrands
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class VisitMarketingActivityBrandsService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): VisitMarketingActivityBrands {
        val searchCriteria = SearchCriteria(ReportingQueryName.MRACB_SELECT.query)
        searchCriteria.addCondition("mracb_id", id)
        return repository.find(searchCriteria).filterIsInstance<VisitMarketingActivityBrands>().first()
    }

    fun create(entity: VisitMarketingActivityBrands): VisitMarketingActivityBrands {
        return repository.create(entity) as VisitMarketingActivityBrands
    }

    fun update(entity: VisitMarketingActivityBrands): VisitMarketingActivityBrands {
        return repository.update(entity) as VisitMarketingActivityBrands
    }

    fun findByParams(valueMap: Map<String,Any>): List<VisitMarketingActivityBrands> {
            val searchCriteria = SearchCriteria(ReportingQueryName.MRACB_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<VisitMarketingActivityBrands>()
    }

    fun deleteByActivity(activityId: String){
        val valueMap = mutableMapOf<String,Any>()
        valueMap["mracb_marketing_activity_id"] = activityId
        repository.fireAdhoc(ReportingQueryName.MRACB_DELETE.query, valueMap)
    }

    fun createActivityBrands(brands: List<String>, activityId: String): Boolean{
        try {
            brands.forEach {
                var visitBrand= VisitMarketingActivityBrands()
                visitBrand.marketingActivity = SquerId(activityId)
                visitBrand.brand = NamedSquerId(it,"")
                repository.create(visitBrand)
            }
            return true
        }catch (e: Exception){
            throw e
        }
    }
}