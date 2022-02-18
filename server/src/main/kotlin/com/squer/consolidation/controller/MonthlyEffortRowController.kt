package com.squer.consolidation.controller

import com.squer.consolidation.effort.MonthlyEffortRow
import com.squer.consolidation.service.MonthlyEffortRowService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/monthlyeffortrow")
@RestController
class MonthlyEffortRowController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: MonthlyEffortRowService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): MonthlyEffortRow {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: MonthlyEffortRow): MonthlyEffortRow {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: MonthlyEffortRow): MonthlyEffortRow {
        return entityService.update(entity)
    }
}