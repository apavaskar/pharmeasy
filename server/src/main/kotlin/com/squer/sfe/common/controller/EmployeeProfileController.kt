package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.EmployeeProfile
import com.squer.sfe.common.service.EmployeeProfileService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.controller.dto.EmployeeProfileListDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.text.SimpleDateFormat
import kotlin.jvm.Throws

@RequestMapping("/employeeprofile")
@RestController
class EmployeeProfileController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: EmployeeProfileService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): EmployeeProfile {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: EmployeeProfile): EmployeeProfile {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: EmployeeProfile): EmployeeProfile {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/list/{employeeId}/{yyyyMm}")
    fun getList(@PathVariable employeeId: String, @PathVariable yyyyMm: String): List<EmployeeProfileListDTO> {
        val dateFormat = SimpleDateFormat("yyyyMMdd")
        var searchCriteria = SearchCriteria(CommonQueryName.EMPLOYEE_PROFILE_LIST_SELECT.query)
        searchCriteria.addCondition("employeeId",employeeId)
        searchCriteria.addCondition("yyyyMmDd", dateFormat.parse(yyyyMm+"01"))
        return repository.find(searchCriteria).filterIsInstance<EmployeeProfileListDTO>()
    }
}