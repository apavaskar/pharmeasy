package com.squer.sfe.reporting.service

import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.HospitalDailyRcpa
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class HospitalDailyRcpaService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): HospitalDailyRcpa {
        val searchCriteria = SearchCriteria(ReportingQueryName.HDRCP_SELECT.query)
        searchCriteria.addCondition("hdrcp_id", id)
        return repository.find(searchCriteria).filterIsInstance<HospitalDailyRcpa>().first()
    }

    fun create(entity: HospitalDailyRcpa): HospitalDailyRcpa {
        return repository.create(entity) as HospitalDailyRcpa
    }

    fun update(entity: HospitalDailyRcpa): HospitalDailyRcpa {
        return repository.update(entity) as HospitalDailyRcpa
    }

    fun findByParams(valueMap: Map<String,Any>): List<HospitalDailyRcpa> {
            val searchCriteria = SearchCriteria(ReportingQueryName.HDRCP_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<HospitalDailyRcpa>()
        }
}