package com.squer.sfe.common.controller

import br.com.devsrsouza.redissed.get
import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.common.entity.Employee
import com.squer.sfe.common.service.EmployeeService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.config.entity.dto.ConfigDTO
import com.squer.platform.config.service.ConfigurationsService
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.security.SecurityExceptionCode
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.controller.dto.EmployeeDTO
import com.squer.sfe.common.controller.dto.EmployeeProfileDTO
import com.squer.sfe.common.service.LocationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws
import kotlin.reflect.jvm.internal.impl.load.kotlin.JvmType

@RequestMapping("/employee")
@RestController
class EmployeeController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: EmployeeService

    @Autowired
    lateinit var locationService: LocationService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Employee {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: Employee): Employee {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Employee): Employee {
        return entityService.update(entity)
    }


    @Throws(SquerException::class)
    @GetMapping("/profile/{userId}")
    fun getEmployeeProfile(@PathVariable userId: String): EmployeeProfileDTO {
        val valueMap = mutableMapOf<String, Any>()
        valueMap["emply_user_id"] = userId
        valueMap["emprf_is_active"] = true
        valueMap["emprf_is_default"] = true
        var employeeData = entityService.getProfile(valueMap)
        var location = locationService.findById(employeeData.profiles!![0].location!!.id)
        return EmployeeProfileDTO(
            employeeData.personCode,
            employeeData.designation,
            NamedSquerId(employeeData.id!!.id,employeeData.name),
            employeeData.profiles!![0].location,
            employeeData.profiles!![0].jobRole,
            location.division,
            employeeData.dateOfJoining
        )
    }

    @Throws(SquerException::class)
    @GetMapping("/profile-by-employee/{employeeId}")
    fun getEmployeeProfileByEmployee(@PathVariable employeeId: String): EmployeeProfileDTO {
        val valueMap = mutableMapOf<String, Any>()
        valueMap["emply_id"] = employeeId
        valueMap["emprf_is_active"] = true
        valueMap["emprf_is_default"] = true
        var employeeData = entityService.getProfile(valueMap)
        var location = locationService.findById(employeeData.profiles!![0].location!!.id)
        return EmployeeProfileDTO(
            employeeData.personCode,
            employeeData.designation,
            NamedSquerId(employeeData.id!!.id,employeeData.name),
            employeeData.profiles!![0].location,
            employeeData.profiles!![0].jobRole,
            location.division,
            employeeData.dateOfJoining
        )
    }

    @Throws(SquerException::class)
    @GetMapping("/hierarchy/{locationId}")
    fun getEmployeeHierarchy(@PathVariable locationId: String): List<EmployeeDTO> {
        var managerList = getMyManagers(locationId)
        var teamList = getMyTeam(locationId)
        return managerList.plus(teamList)
    }

    @Throws(SquerException::class)
    @GetMapping("/my-team/{locationId}")
    fun getMyTeam(@PathVariable locationId: String): List<EmployeeDTO> {
        //TODO MAKE SERVICE
        val searchCriteriaTeam = SearchCriteria(CommonQueryName.MY_TEAM_SELECT.query)
        searchCriteriaTeam.addCondition("locationId", locationId)
        var teamMapList = repository.find(searchCriteriaTeam).filterIsInstance<Map<String,Any>>()
        var employeeDTOList = mutableListOf<EmployeeDTO>()

        teamMapList.forEach{
            employeeDTOList.add(
                EmployeeDTO(
                    NamedSquerId(it.get("locat_id").toString(),it.get("locat_name").toString()),
                    NamedSquerId(it.get("emply_id").toString(),it.get("emply_name").toString()),
                    NamedSquerId(it.get("jobrl_id").toString(),it.get("jobrl_name").toString()),
                )
            )
        }
        return employeeDTOList
    }

    @Throws(SquerException::class)
    @GetMapping("/my-managers/{locationId}")
    fun getMyManagers(@PathVariable locationId: String): List<EmployeeDTO> {
        var managerMapList = entityService.getManagerForLocation(locationId)
        var employeeDTOList = mutableListOf<EmployeeDTO>()

        managerMapList.forEach{
            employeeDTOList.add(
                EmployeeDTO(
                    NamedSquerId(it.get("locat_id").toString(),it.get("locat_name").toString()),
                    NamedSquerId(it.get("emply_id").toString(),it.get("emply_name").toString()),
                    NamedSquerId(it.get("jobrl_id").toString(),it.get("jobrl_name").toString()),
                )
            )
        }
        return employeeDTOList
    }
}