package com.squer.sfe.reporting.controller

import com.squer.sfe.reporting.entity.VisitMarketingActivityDoctors
import com.squer.sfe.reporting.service.VisitMarketingActivityDoctorsService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/visitmarketingactivitydoctors")
@RestController
class VisitMarketingActivityDoctorsController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: VisitMarketingActivityDoctorsService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): VisitMarketingActivityDoctors {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: VisitMarketingActivityDoctors): VisitMarketingActivityDoctors {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: VisitMarketingActivityDoctors): VisitMarketingActivityDoctors {
        return entityService.update(entity)
    }
}