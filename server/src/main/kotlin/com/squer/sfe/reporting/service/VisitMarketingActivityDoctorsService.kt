package com.squer.sfe.reporting.service

import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.VisitMarketingActivityDoctors
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class VisitMarketingActivityDoctorsService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): VisitMarketingActivityDoctors {
        val searchCriteria = SearchCriteria(ReportingQueryName.MRADT_SELECT.query)
        searchCriteria.addCondition("mradt_id", id)
        return repository.find(searchCriteria).filterIsInstance<VisitMarketingActivityDoctors>().first()
    }

    fun create(entity: VisitMarketingActivityDoctors): VisitMarketingActivityDoctors {
        return repository.create(entity) as VisitMarketingActivityDoctors
    }

    fun update(entity: VisitMarketingActivityDoctors): VisitMarketingActivityDoctors {
        return repository.update(entity) as VisitMarketingActivityDoctors
    }

    fun findByParams(valueMap: Map<String,Any>): List<VisitMarketingActivityDoctors> {
            val searchCriteria = SearchCriteria(ReportingQueryName.MRADT_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<VisitMarketingActivityDoctors>()
        }

    fun deleteByActivity(activityId: String){
        val valueMap = mutableMapOf<String,Any>()
        valueMap["mradt_marketing_activity_id"] = activityId
        repository.fireAdhoc(ReportingQueryName.MRADT_DELETE.query, valueMap)
    }

    fun createActivityDoctors(doctors: List<String>, activityId: String): Boolean{
        try {
            doctors.forEach {
                var visitDoctors= VisitMarketingActivityDoctors()
                visitDoctors.marketingActivity = SquerId(activityId)
                visitDoctors.doctor = NamedSquerId(it,"")
                repository.create(visitDoctors)
            }
            return true
        }catch (e: Exception){
            throw e
        }
    }
}