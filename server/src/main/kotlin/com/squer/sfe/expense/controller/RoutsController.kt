package com.squer.sfe.expense.controller

import com.squer.sfe.expense.entity.Routs
import com.squer.sfe.expense.service.RoutsService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/routs")
@RestController
class RoutsController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: RoutsService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Routs {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PostMapping("/create")
    fun createEntity(@RequestBody entity: Routs): Routs {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Routs): Routs {
        return entityService.update(entity)
    }
}