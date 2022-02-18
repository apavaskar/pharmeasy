package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.State
import com.squer.sfe.common.service.StateService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/state")
@RestController
class StateController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: StateService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): State {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: State): State {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: State): State {
        return entityService.update(entity)
    }
}