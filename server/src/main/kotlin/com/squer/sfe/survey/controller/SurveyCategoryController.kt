package com.squer.sfe.survey.controller

import com.squer.sfe.survey.entity.SurveyCategory
import com.squer.sfe.survey.service.SurveyCategoryService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/surveycategory")
@RestController
class SurveyCategoryController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: SurveyCategoryService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): SurveyCategory {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: SurveyCategory): SurveyCategory {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: SurveyCategory): SurveyCategory {
        return entityService.update(entity)
    }
}