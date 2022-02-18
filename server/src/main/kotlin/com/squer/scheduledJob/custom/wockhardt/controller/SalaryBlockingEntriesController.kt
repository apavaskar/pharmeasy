package com.squer.scheduledJob.custom.wockhardt.controller

import com.squer.scheduledJob.custom.wockhardt.entity.SalaryBlockingEntries
import com.squer.scheduledJob.custom.wockhardt.service.SalaryBlockingEntriesService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.scheduledJob.custom.wockhardt.service.ScheduleEngine
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/salaryblockingentries")
@RestController
class SalaryBlockingEntriesController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: SalaryBlockingEntriesService

    @Autowired
    lateinit var scheduleEngine: ScheduleEngine

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): SalaryBlockingEntries {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PostMapping("/create")
    fun createEntity(@RequestBody entity: SalaryBlockingEntries): SalaryBlockingEntries {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: SalaryBlockingEntries): SalaryBlockingEntries {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/execute")
    fun executeJob() {
        scheduleEngine.execute("SalaryBlockingJob", mutableMapOf())
    }
}