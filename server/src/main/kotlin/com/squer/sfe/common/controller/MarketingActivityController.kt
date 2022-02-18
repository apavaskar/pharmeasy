package com.squer.sfe.common.controller

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.common.entity.MarketingActivity
import com.squer.sfe.common.service.MarketingActivityService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.controller.dto.MarketingActivityDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/marketingactivity")
@RestController
class MarketingActivityController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: MarketingActivityService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): MarketingActivity {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: MarketingActivity): MarketingActivity {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: MarketingActivity): MarketingActivity {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-location/{locationId}")
    fun getByLocation(@PathVariable locationId: String,@RequestParam(defaultValue = "true") isActive: String): List<MarketingActivityDTO> {
        var activities = entityService.findByLocation(locationId, isActive.toLowerCase() == "true")
        var dtoList = mutableListOf<MarketingActivityDTO>()
        activities.forEach{
            dtoList.add(
                MarketingActivityDTO(
                    NamedSquerId(it.id!!.id, it.name),
                    it.inClinicActivity
                )
            )
        }
        return dtoList
    }
}