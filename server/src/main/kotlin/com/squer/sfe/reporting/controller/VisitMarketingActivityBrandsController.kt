package com.squer.sfe.reporting.controller

import com.squer.sfe.reporting.entity.VisitMarketingActivityBrands
import com.squer.sfe.reporting.service.VisitMarketingActivityBrandsService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/visitmarketingactivitybrands")
@RestController
class VisitMarketingActivityBrandsController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: VisitMarketingActivityBrandsService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): VisitMarketingActivityBrands {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: VisitMarketingActivityBrands): VisitMarketingActivityBrands {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: VisitMarketingActivityBrands): VisitMarketingActivityBrands {
        return entityService.update(entity)
    }
}