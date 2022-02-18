package com.squer.sfe.reporting.service

import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.HospitalPatientTarget
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class HospitalPatientTargetService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): HospitalPatientTarget {
        val searchCriteria = SearchCriteria(ReportingQueryName.HSPTG_SELECT.query)
        searchCriteria.addCondition("hsptg_id", id)
        return repository.find(searchCriteria).filterIsInstance<HospitalPatientTarget>().first()
    }

    fun create(entity: HospitalPatientTarget): HospitalPatientTarget {
        return repository.create(entity) as HospitalPatientTarget
    }

    fun update(entity: HospitalPatientTarget): HospitalPatientTarget {
        return repository.update(entity) as HospitalPatientTarget
    }

    fun findByParams(valueMap: Map<String,Any>): List<HospitalPatientTarget> {
            val searchCriteria = SearchCriteria(ReportingQueryName.HSPTG_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<HospitalPatientTarget>()
        }
}