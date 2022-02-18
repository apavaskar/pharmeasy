package com.squer.sfe.leave.service

import com.squer.sfe.leave.LeaveQueryName
import com.squer.sfe.leave.entity.LeaveConfig
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class LeaveConfigService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): LeaveConfig {
        val searchCriteria = SearchCriteria(LeaveQueryName.LVCFG_SELECT.query)
        searchCriteria.addCondition("lvcfg_id", id)
        return repository.find(searchCriteria).filterIsInstance<LeaveConfig>().first()
    }

    fun create(entity: LeaveConfig): LeaveConfig {
        return repository.create(entity) as LeaveConfig
    }

    fun update(entity: LeaveConfig): LeaveConfig {
        return repository.update(entity) as LeaveConfig
    }

    fun findByParams(valueMap: Map<String,Any>): List<LeaveConfig> {
            val searchCriteria = SearchCriteria(LeaveQueryName.LVCFG_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<LeaveConfig>()
        }
}