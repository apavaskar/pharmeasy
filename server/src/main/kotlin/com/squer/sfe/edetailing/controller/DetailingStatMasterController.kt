package com.squer.sfe.edetailing.controller

import com.squer.sfe.edetailing.entity.DetailingStatMaster
import com.squer.sfe.edetailing.service.DetailingStatMasterService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/detailingstatmaster")
@RestController
class DetailingStatMasterController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: DetailingStatMasterService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): DetailingStatMaster {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: DetailingStatMaster): DetailingStatMaster {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: DetailingStatMaster): DetailingStatMaster {
        return entityService.update(entity)
    }
}