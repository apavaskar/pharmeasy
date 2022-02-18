package com.squer.scheduledJob.custom.wockhardt.service

import com.squer.scheduledJob.custom.wockhardt.WockhardtQueryName
import com.squer.scheduledJob.custom.wockhardt.entity.ScheduledJob
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ScheduledJobService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): ScheduledJob {
        val searchCriteria = SearchCriteria(WockhardtQueryName.SCHJB_SELECT.query)
        searchCriteria.addCondition("schjb_id", id)
        return repository.find(searchCriteria).filterIsInstance<ScheduledJob>().first()
    }

    fun create(entity: ScheduledJob): ScheduledJob {
        return repository.create(entity) as ScheduledJob
    }

    fun update(entity: ScheduledJob): ScheduledJob {
        return repository.update(entity) as ScheduledJob
    }

    fun findByParams(valueMap: Map<String,Any>): List<ScheduledJob> {
            val searchCriteria = SearchCriteria(WockhardtQueryName.SCHJB_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<ScheduledJob>()
        }
}