package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.Holiday
import com.squer.sfe.common.service.HolidayService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.controller.dto.HolidayListDTO
import com.squer.sfe.common.entity.HolidayDetails
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/holiday")
@RestController
class HolidayController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: HolidayService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Holiday {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PostMapping("/create")
    fun createEntity(@RequestBody entity: Holiday): Holiday {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Holiday): Holiday {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("by-location/{locationId}/{jobRoleId}/{yyyyMm}")
    fun getByLocation(@PathVariable locationId: String, @PathVariable jobRoleId: String, @PathVariable yyyyMm: Int): List<HolidayListDTO> {
        var searchCriteria = SearchCriteria(CommonQueryName.HOLIDAYS_FOR_LOCATION_SELECT.query)
        searchCriteria.addCondition("locationId",locationId)
        searchCriteria.addCondition("jobId",jobRoleId)
        searchCriteria.addCondition("yearMonth",yyyyMm)
        var holidayDetails = repository.find(searchCriteria).filterIsInstance<HolidayDetails>()
        var dtoList = mutableListOf<HolidayListDTO>()
        holidayDetails.forEach {
            dtoList.add(
                HolidayListDTO(it.holiday!!.id, it.holiday!!.name, it.yyyyMmDd)
            )
        }
        return dtoList
    }
}