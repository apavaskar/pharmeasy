package com.squer.sfe.survey.controller

import com.squer.sfe.survey.entity.SurveyQuestion
import com.squer.sfe.survey.service.SurveyQuestionService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/surveyquestion")
@RestController
class SurveyQuestionController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: SurveyQuestionService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): SurveyQuestion {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: SurveyQuestion): SurveyQuestion {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: SurveyQuestion): SurveyQuestion {
        return entityService.update(entity)
    }
}