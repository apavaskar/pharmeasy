package com.squer.sfe.common.controller

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.common.entity.Beat
import com.squer.sfe.common.service.BeatService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/beat")
@RestController
class BeatController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: BeatService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Beat {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: Beat): Beat {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Beat): Beat {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-location/{locationId}")
    fun getBeatsForLocation(@PathVariable locationId: String): List<NamedSquerId> {
        var beatList = mutableListOf<NamedSquerId>()
        entityService.findByLocation(locationId).forEach{
            beatList.add(NamedSquerId(it.id!!.id,it.name))
        }
        return beatList
    }
}