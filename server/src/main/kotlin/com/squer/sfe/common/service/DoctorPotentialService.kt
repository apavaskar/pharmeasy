package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.DoctorPotential
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class DoctorPotentialService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): DoctorPotential {
        val searchCriteria = SearchCriteria(CommonQueryName.DOCPU_SELECT.query)
        searchCriteria.addCondition("docpu_id", id)
        return repository.find(searchCriteria).filterIsInstance<DoctorPotential>().first()
    }

    fun create(entity: DoctorPotential): DoctorPotential {
        return repository.create(entity) as DoctorPotential
    }

    fun update(entity: DoctorPotential): DoctorPotential {
        return repository.update(entity) as DoctorPotential
    }

    fun findByParams(valueMap: Map<String,Any>): List<DoctorPotential> {
            val searchCriteria = SearchCriteria(CommonQueryName.DOCPU_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<DoctorPotential>()
        }

    fun getPotentialByDoctor(doctorId: String):List<DoctorPotential>{
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("docpu_doctor_id",doctorId)
        valueMap.put("docpu_is_focused", true)
        return findByParams(valueMap)
    }
}