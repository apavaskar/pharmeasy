package com.squer.sfe.edetailing.controller

import com.squer.sfe.edetailing.entity.DetailingFaqs
import com.squer.sfe.edetailing.service.DetailingFaqsService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/detailingfaqs")
@RestController
class DetailingFaqsController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: DetailingFaqsService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): DetailingFaqs {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: DetailingFaqs): DetailingFaqs {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: DetailingFaqs): DetailingFaqs {
        return entityService.update(entity)
    }
}