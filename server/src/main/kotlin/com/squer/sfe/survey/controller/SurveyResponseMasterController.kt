package com.squer.sfe.survey.controller

import com.squer.sfe.survey.entity.SurveyResponseMaster
import com.squer.sfe.survey.service.SurveyResponseMasterService
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.survey.controller.dto.SurveyResponseDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/surveyresponsemaster")
@RestController
class SurveyResponseMasterController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: SurveyResponseMasterService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): SurveyResponseMaster {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: SurveyResponseMaster): SurveyResponseMaster {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: SurveyResponseMaster): SurveyResponseMaster {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/save-response")
    fun saveResponse(@RequestBody survey: SurveyResponseDTO): Boolean {
        return entityService.saveResponse(survey)
    }
}