package com.squer.sfe.survey.controller

import com.squer.sfe.survey.entity.SurveyResponseAnswers
import com.squer.sfe.survey.service.SurveyResponseAnswersService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/surveyresponseanswers")
@RestController
class SurveyResponseAnswersController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: SurveyResponseAnswersService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): SurveyResponseAnswers {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: SurveyResponseAnswers): SurveyResponseAnswers {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: SurveyResponseAnswers): SurveyResponseAnswers {
        return entityService.update(entity)
    }
}