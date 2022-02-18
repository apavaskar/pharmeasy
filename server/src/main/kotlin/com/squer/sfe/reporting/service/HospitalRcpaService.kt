package com.squer.sfe.reporting.service

import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.HospitalRcpa
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class HospitalRcpaService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): HospitalRcpa {
        val searchCriteria = SearchCriteria(ReportingQueryName.HRCPA_SELECT.query)
        searchCriteria.addCondition("hrcpa_id", id)
        return repository.find(searchCriteria).filterIsInstance<HospitalRcpa>().first()
    }

    fun create(entity: HospitalRcpa): HospitalRcpa {
        return repository.create(entity) as HospitalRcpa
    }

    fun update(entity: HospitalRcpa): HospitalRcpa {
        return repository.update(entity) as HospitalRcpa
    }

    fun findByParams(valueMap: Map<String,Any>): List<HospitalRcpa> {
            val searchCriteria = SearchCriteria(ReportingQueryName.HRCPA_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<HospitalRcpa>()
        }
}