package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.Town
import com.squer.sfe.common.service.TownService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Employee
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/town")
@RestController
class TownController {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: TownService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Town {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: Town): Town {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Town): Town {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/all/{locationId}")
    fun getAllTownsForLocation(@PathVariable locationId: String,@RequestParam(defaultValue = "doc") ownerType: String): List<Town> {
        var criteria = SearchCriteria(CommonQueryName.MY_ALL_TOWN_LIST_SELECT.query)
        criteria.addCondition("locationId", locationId)
        criteria.addCondition("ownerType", ownerType)
        return repository.find(criteria).filterIsInstance<Town>()
    }
}