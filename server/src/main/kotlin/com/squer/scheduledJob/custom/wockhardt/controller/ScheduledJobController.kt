package com.squer.scheduledJob.custom.wockhardt.controller

import com.squer.scheduledJob.custom.wockhardt.entity.ScheduledJob
import com.squer.scheduledJob.custom.wockhardt.service.ScheduledJobService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/scheduledjob")
@RestController
class ScheduledJobController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: ScheduledJobService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): ScheduledJob {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PostMapping("/create")
    fun createEntity(@RequestBody entity: ScheduledJob): ScheduledJob {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: ScheduledJob): ScheduledJob {
        return entityService.update(entity)
    }
}