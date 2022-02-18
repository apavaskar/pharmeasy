package com.squer.sfe.edetailing.controller

import com.squer.sfe.edetailing.entity.DetailingStat
import com.squer.sfe.edetailing.service.DetailingStatService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/detailingstat")
@RestController
class DetailingStatController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: DetailingStatService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): DetailingStat {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: DetailingStat): DetailingStat {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: DetailingStat): DetailingStat {
        return entityService.update(entity)
    }
}