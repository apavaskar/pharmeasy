package com.squer.sfe.reporting.controller

import com.squer.sfe.reporting.entity.HospitalPatientTarget
import com.squer.sfe.reporting.service.HospitalPatientTargetService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/hospitalpatienttarget")
@RestController
class HospitalPatientTargetController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: HospitalPatientTargetService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): HospitalPatientTarget {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: HospitalPatientTarget): HospitalPatientTarget {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: HospitalPatientTarget): HospitalPatientTarget {
        return entityService.update(entity)
    }
}