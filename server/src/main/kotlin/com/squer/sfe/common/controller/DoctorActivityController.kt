package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.DoctorActivity
import com.squer.sfe.common.service.DoctorActivityService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/doctoractivity")
@RestController
class DoctorActivityController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: DoctorActivityService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): DoctorActivity {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PostMapping("/create")
    fun createEntity(@RequestBody entity: DoctorActivity): DoctorActivity {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: DoctorActivity): DoctorActivity {
        return entityService.update(entity)
    }
}