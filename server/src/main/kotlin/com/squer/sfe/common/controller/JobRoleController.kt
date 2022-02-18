package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.JobRole
import com.squer.sfe.common.service.JobRoleService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/jobrole")
@RestController
class JobRoleController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: JobRoleService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): JobRole {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: JobRole): JobRole {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: JobRole): JobRole {
        return entityService.update(entity)
    }
}