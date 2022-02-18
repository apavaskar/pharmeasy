package com.squer.sfe.reporting.controller

import com.squer.sfe.reporting.entity.DigitalVisit
import com.squer.sfe.reporting.service.DigitalVisitService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.controller.dto.DigitalVisitDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/digitalvisit")
@RestController
class DigitalVisitController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: DigitalVisitService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): DigitalVisit {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: DigitalVisit): DigitalVisit {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: DigitalVisit): DigitalVisit {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-employee/{locationId}/{fromMonth}/{toMonth}")
    fun getByEmployee(@PathVariable locationId: String, @PathVariable fromMonth: Int, @PathVariable toMonth: Int): List<DigitalVisitDTO>{
        var searchCriteria = SearchCriteria(ReportingQueryName.DIGITAL_VISIT_FOR_EMPLOYEE_SELECT.query)
        searchCriteria.addCondition("locationId",locationId)
        searchCriteria.addCondition("fromMonth", fromMonth)
        searchCriteria.addCondition("toMonth", toMonth)
        var digitalVisitList= repository.find(searchCriteria).filterIsInstance<DigitalVisit>()
        var dtoList = mutableListOf<DigitalVisitDTO>()
        digitalVisitList.forEach {
            var dto = DigitalVisitDTO()
            dto.entityId = it.id!!.id
            dto.attendeeId = it.attendee!!.id
            dto.visitModeId = it.visitMode!!.id
            dto.duration = it.duration
            dto.templateId = it.templateId!!.id
            dtoList.add(dto)
        }
        return dtoList
    }
}