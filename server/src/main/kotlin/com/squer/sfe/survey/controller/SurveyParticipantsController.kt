package com.squer.sfe.survey.controller

import com.squer.sfe.survey.entity.SurveyParticipants
import com.squer.sfe.survey.service.SurveyParticipantsService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/surveyparticipants")
@RestController
class SurveyParticipantsController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: SurveyParticipantsService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): SurveyParticipants {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: SurveyParticipants): SurveyParticipants {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: SurveyParticipants): SurveyParticipants {
        return entityService.update(entity)
    }
}