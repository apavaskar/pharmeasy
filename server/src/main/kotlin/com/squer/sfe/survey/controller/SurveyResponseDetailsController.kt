package com.squer.sfe.survey.controller

import com.squer.sfe.survey.entity.SurveyResponseDetails
import com.squer.sfe.survey.service.SurveyResponseDetailsService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/surveyresponsedetails")
@RestController
class SurveyResponseDetailsController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: SurveyResponseDetailsService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): SurveyResponseDetails {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: SurveyResponseDetails): SurveyResponseDetails {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: SurveyResponseDetails): SurveyResponseDetails {
        return entityService.update(entity)
    }
}