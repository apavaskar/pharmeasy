package com.squer.sfe.common.controller

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.common.entity.Division
import com.squer.sfe.common.service.DivisionService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/division")
@RestController
class DivisionController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: DivisionService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Division {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: Division): Division {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Division): Division {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/list")
    fun getDivisionList(): List<NamedSquerId> {
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("divsn_is_active",true)
        var divisions = entityService.findByParams(valueMap)
        var nsIdList = mutableListOf<NamedSquerId>()

        divisions.forEach {
            nsIdList.add(NamedSquerId(it.id!!.id, it.name))
        }
        return nsIdList
    }
}