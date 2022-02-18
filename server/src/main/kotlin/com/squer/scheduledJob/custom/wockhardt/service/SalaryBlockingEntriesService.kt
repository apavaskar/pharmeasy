package com.squer.scheduledJob.custom.wockhardt.service

import com.squer.scheduledJob.custom.wockhardt.WockhardtQueryName
import com.squer.scheduledJob.custom.wockhardt.entity.SalaryBlockingEntries
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SalaryBlockingEntriesService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): SalaryBlockingEntries {
        val searchCriteria = SearchCriteria(WockhardtQueryName.SLBLK_SELECT.query)
        searchCriteria.addCondition("slblk_id", id)
        return repository.find(searchCriteria).filterIsInstance<SalaryBlockingEntries>().first()
    }

    fun create(entity: SalaryBlockingEntries): SalaryBlockingEntries {
        return repository.create(entity) as SalaryBlockingEntries
    }

    fun update(entity: SalaryBlockingEntries): SalaryBlockingEntries {
        return repository.update(entity) as SalaryBlockingEntries
    }

    fun findByParams(valueMap: Map<String,Any>): List<SalaryBlockingEntries> {
            val searchCriteria = SearchCriteria(WockhardtQueryName.SLBLK_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<SalaryBlockingEntries>()
        }
}