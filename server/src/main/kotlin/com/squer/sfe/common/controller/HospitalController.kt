package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.Hospital
import com.squer.sfe.common.service.HospitalService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.controller.dto.HospitalDTO
import com.squer.sfe.common.controller.dto.HospitalTargetDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/hospital")
@RestController
class HospitalController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: HospitalService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Hospital {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: Hospital): Hospital {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Hospital): Hospital {
        return entityService.update(entity)
    }


    @Throws(SquerException::class)
    @GetMapping("/by-location/{locationId}")
    fun getByLocation(@PathVariable locationId: String): List<HospitalDTO> {
        var searchCriteria = SearchCriteria(CommonQueryName.HOSPITAL_BY_LOCATION_SELECT.query)
        searchCriteria.addCondition("locationId",locationId)
        var dtoList = repository.find(searchCriteria).filterIsInstance<HospitalDTO>()
        return dtoList
    }

    @Throws(SquerException::class)
    @GetMapping("/by-location-target/{locationId}/{yyyyMM}")
    fun getByLocationTarget(@PathVariable locationId: String, @PathVariable yyyyMM: Int): List<HospitalTargetDTO> {
        return entityService.getHospitalTarget(locationId,yyyyMM)
    }
}