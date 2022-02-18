package com.squer.sfe.edetailing.controller

import com.squer.sfe.edetailing.entity.DetailingAdditionalInfo
import com.squer.sfe.edetailing.service.DetailingAdditionalInfoService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/detailingadditionalinfo")
@RestController
class DetailingAdditionalInfoController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: DetailingAdditionalInfoService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): DetailingAdditionalInfo {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: DetailingAdditionalInfo): DetailingAdditionalInfo {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: DetailingAdditionalInfo): DetailingAdditionalInfo {
        return entityService.update(entity)
    }
}