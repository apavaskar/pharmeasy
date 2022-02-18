package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.Stockist
import com.squer.sfe.common.service.StockistService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/stockist")
@RestController
class StockistController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: StockistService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Stockist {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: Stockist): Stockist {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Stockist): Stockist {
        return entityService.update(entity)
    }
}