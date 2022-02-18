package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.DoctorPotential
import com.squer.sfe.common.service.DoctorPotentialService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/doctorpotential")
@RestController
class DoctorPotentialController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: DoctorPotentialService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): DoctorPotential {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: DoctorPotential): DoctorPotential {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: DoctorPotential): DoctorPotential {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-doctor/{doctorId}")
    fun getPotentialByDoctor(@PathVariable doctorId: String): List<DoctorPotential> {
        return entityService.getPotentialByDoctor(doctorId)
    }
}