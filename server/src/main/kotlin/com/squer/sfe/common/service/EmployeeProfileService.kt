package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.EmployeeProfile
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class EmployeeProfileService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): EmployeeProfile {
        val searchCriteria = SearchCriteria(CommonQueryName.EMPRF_SELECT.query)
        searchCriteria.addCondition("emprf_id", id)
        return repository.find(searchCriteria).filterIsInstance<EmployeeProfile>().first()
    }

    fun create(entity: EmployeeProfile): EmployeeProfile {
        return repository.create(entity) as EmployeeProfile
    }

    fun update(entity: EmployeeProfile): EmployeeProfile {
        return repository.update(entity) as EmployeeProfile
    }

    fun findByParams(valueMap: Map<String,Any>): List<EmployeeProfile> {
        val searchCriteria = SearchCriteria(CommonQueryName.EMPRF_SELECT.query)
        valueMap.forEach {
            searchCriteria.addCondition(it.key, it.value)
        }
        return repository.find(searchCriteria).filterIsInstance<EmployeeProfile>()
    }

    fun getProfile(employeeId: String): List<EmployeeProfile>{
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("emprf_employee_id",employeeId)
        valueMap.put("emprf_is_active", true)
        valueMap.put("emprf_is_default", true)
        return  findByParams(valueMap)
    }
}