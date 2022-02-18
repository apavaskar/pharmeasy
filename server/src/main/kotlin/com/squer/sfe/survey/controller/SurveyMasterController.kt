package com.squer.sfe.survey.controller

import com.squer.platform.persistence.SearchCriteria
import com.squer.sfe.survey.entity.SurveyMaster
import com.squer.sfe.survey.service.SurveyMasterService
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.survey.SurveyQueryName
import com.squer.sfe.survey.controller.dto.SurveyDetailsDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/surveymaster")
@RestController
class SurveyMasterController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: SurveyMasterService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): SurveyMaster {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: SurveyMaster): SurveyMaster {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: SurveyMaster): SurveyMaster {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/details/{id}")
    fun getSurveyDetails(@PathVariable id: String): SurveyDetailsDTO {
        var searchCriteria = SearchCriteria(SurveyQueryName.SURVY_DETAILS_SELECT.query)
        searchCriteria.addCondition("surveyId", id)
        return repository.find(searchCriteria).filterIsInstance<SurveyDetailsDTO>().first()
    }


}