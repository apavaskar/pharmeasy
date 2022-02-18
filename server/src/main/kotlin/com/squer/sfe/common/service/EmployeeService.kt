package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Employee
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.controller.dto.EmployeeDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class EmployeeService {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var employeeProfileService: EmployeeProfileService

    fun findById(id: String): Employee {
        val searchCriteria = SearchCriteria(CommonQueryName.EMPLY_SELECT.query)
        searchCriteria.addCondition("emply_id", id)
        var employee = repository.find(searchCriteria).filterIsInstance<Employee>().first()
        employee.profiles = employeeProfileService.getProfile(employee.id!!.id)
        return employee
    }

    fun create(entity: Employee): Employee {
        return repository.create(entity) as Employee
    }

    fun update(entity: Employee): Employee {
        return repository.update(entity) as Employee
    }

    fun findByParams(valueMap: Map<String,Any>): List<Employee> {
        val searchCriteria = SearchCriteria(CommonQueryName.EMPLY_SELECT.query)
        valueMap.forEach {
            searchCriteria.addCondition(it.key, it.value)
        }
        return repository.find(searchCriteria).filterIsInstance<Employee>()
    }


    fun getProfile(valueMap: Map<String,Any>): Employee {
        val searchCriteria = SearchCriteria(CommonQueryName.EMPLOYEE_PROFILE_SELECT.query)
        valueMap.forEach {
            searchCriteria.addCondition(it.key, it.value)
        }
        var employees = repository.find(searchCriteria).filterIsInstance<Employee>()
        if(employees.isEmpty())
            return Employee()
        else
            return employees[0]
    }

    fun getManagerForLocation(locationId: String): List<Map<String, Any>> {
        val searchCriteriaManager = SearchCriteria(CommonQueryName.MY_MANAGER_SELECT.query)
        searchCriteriaManager.addCondition("locationId", locationId)
        return repository.find(searchCriteriaManager).filterIsInstance<Map<String,Any>>()
    }
}