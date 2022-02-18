package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.DoctorActivity
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class DoctorActivityService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): DoctorActivity {
        val searchCriteria = SearchCriteria(CommonQueryName.DOCAT_SELECT.query)
        searchCriteria.addCondition("docat_id", id)
        return repository.find(searchCriteria).filterIsInstance<DoctorActivity>().first()
    }

    fun create(entity: DoctorActivity): DoctorActivity {
        return repository.create(entity) as DoctorActivity
    }

    fun update(entity: DoctorActivity): DoctorActivity {
        return repository.update(entity) as DoctorActivity
    }

    fun findByParams(valueMap: Map<String,Any>): List<DoctorActivity> {
            val searchCriteria = SearchCriteria(CommonQueryName.DOCAT_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<DoctorActivity>()
        }
}