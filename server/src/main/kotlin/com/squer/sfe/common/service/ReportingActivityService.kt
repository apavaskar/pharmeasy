package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.ReportingActivity
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ReportingActivityService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): ReportingActivity {
        val searchCriteria = SearchCriteria(CommonQueryName.RPACT_SELECT.query)
        searchCriteria.addCondition("rpact_id", id)
        return repository.find(searchCriteria).filterIsInstance<ReportingActivity>().first()
    }

    fun create(entity: ReportingActivity): ReportingActivity {
        return repository.create(entity) as ReportingActivity
    }

    fun update(entity: ReportingActivity): ReportingActivity {
        return repository.update(entity) as ReportingActivity
    }

    fun findByParams(valueMap: Map<String,Any>): List<ReportingActivity> {
            val searchCriteria = SearchCriteria(CommonQueryName.RPACT_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<ReportingActivity>()
        }
}