package com.squer.sfe.leave.controller

import com.squer.sfe.leave.entity.LeaveConfig
import com.squer.sfe.leave.service.LeaveConfigService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/leaveconfig")
@RestController
class LeaveConfigController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: LeaveConfigService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): LeaveConfig {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: LeaveConfig): LeaveConfig {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: LeaveConfig): LeaveConfig {
        return entityService.update(entity)
    }
}