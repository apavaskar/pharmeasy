package com.squer.sfe.survey.controller

import com.squer.sfe.survey.entity.SurveyConfig
import com.squer.sfe.survey.service.SurveyConfigService
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.survey.SurveyQueryName
import com.squer.sfe.survey.controller.dto.SurveyMasterDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/surveyconfig")
@RestController
class SurveyConfigController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: SurveyConfigService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): SurveyConfig {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: SurveyConfig): SurveyConfig {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: SurveyConfig): SurveyConfig {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-employee-type/{employee}/{type}")
    fun getByEmployeeAndType(@PathVariable employee: String,@PathVariable type: String): List<SurveyMasterDTO> {
        var searchCriteria = SearchCriteria(SurveyQueryName.SURVY_LIST_SELECT.query)
        searchCriteria.addCondition("employeeId", employee)
        searchCriteria.addCondition("surveyTypeId", type)
        return repository.find(searchCriteria).filterIsInstance<SurveyMasterDTO>()
    }

}