package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.Location
import com.squer.sfe.common.service.LocationService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.controller.dto.LocationDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/location")
@RestController
class LocationController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: LocationService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Location {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: Location): Location {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Location): Location {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/hierarchy/{searchId}")
    fun getLocationHierarchy(@PathVariable searchId: String): List<LocationDTO> {
        var locations = entityService.getLocationHierarchy(searchId)
        var dtoList = mutableListOf<LocationDTO>()
        locations.forEach {
            dtoList.add(LocationDTO(it.id!!.id, it.name,it.type!!.name))
        }
        return dtoList
    }
}