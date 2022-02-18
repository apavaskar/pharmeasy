package com.squer.sfe.reporting.controller

import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.sfe.reporting.entity.VisitDetailing
import com.squer.sfe.reporting.service.VisitDetailingService
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.controller.dto.DetailingDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/visitdetailing")
@RestController
class VisitDetailingController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: VisitDetailingService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): VisitDetailing {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: VisitDetailing): VisitDetailing {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: VisitDetailing): VisitDetailing {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-attendee/{attendeeId}")
    fun getByAttendeeId(@PathVariable attendeeId: String): List<DetailingDTO> {
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("vdetl_attendee_id",attendeeId)
        valueMap.put("vdetl_is_active",true)
        var dtoList = mutableListOf<DetailingDTO>()
        entityService.findByParams(valueMap).forEach{
            dtoList.add(mapToDTO(it))
        }
        return dtoList
    }

    @Throws(SquerException::class)
    @PutMapping("/create-detailing")
    fun createDetaining(@RequestBody dtos: List<DetailingDTO>): List<DetailingDTO> {
        var dtoList = mutableListOf<DetailingDTO>()
        dtos.forEach{
            if(it.detailingId == null){
                var detailing = VisitDetailing()
                detailing.attendee = SquerId(it.attendeeId!!)
                detailing.sequence = it.sequence
                detailing.brand = NamedSquerId(it.brandId!!,"")
                detailing.messageType = NamedSquerId(it.messageTypeId!!,"")
                detailing.prescriptionLevel = it.prescriptionLevel
                detailing.isActive = true
                dtoList.add(mapToDTO(entityService.create(detailing)))
            }else {
                var detailing = getById(it.detailingId!!)
                detailing.attendee = SquerId(it.attendeeId!!)
                detailing.sequence = it.sequence
                detailing.brand = NamedSquerId(it.brandId!!,"")
                detailing.messageType = NamedSquerId(it.messageTypeId!!,"")
                detailing.prescriptionLevel = it.prescriptionLevel
                dtoList.add(mapToDTO(entityService.update(detailing)))
            }
        }
        return dtoList
    }

    @Throws(SquerException::class)
    @PutMapping("/delete/{id}")
    fun deleteEntity(@PathVariable id: String): Boolean {
        var detailing = getById(id)
        detailing.isActive = false
        entityService.update(detailing)
        return true
    }

    @Throws(SquerException::class)
    @GetMapping("/by-employee/{locationId}/{fromMonth}/{toMonth}")
    fun getByEmployee(@PathVariable locationId: String, @PathVariable fromMonth: Int, @PathVariable toMonth: Int):List<DetailingDTO>{
        var searchCriteria = SearchCriteria(ReportingQueryName.DETAILING_FOR_EMPLOYEE_SELECT.query)
        searchCriteria.addCondition("locationId",locationId)
        searchCriteria.addCondition("fromMonth", fromMonth)
        searchCriteria.addCondition("toMonth", toMonth)
        var detailingList= repository.find(searchCriteria).filterIsInstance<VisitDetailing>()
        var dtoList= mutableListOf<DetailingDTO>()
        detailingList.forEach {
            dtoList.add(mapToDTO(it))
        }
        return dtoList
    }

    fun mapToDTO(detailing: VisitDetailing): DetailingDTO{
        var dto = DetailingDTO()
        dto.detailingId = detailing.id!!.id
        dto.attendeeId = detailing.attendee!!.id
        dto.sequence = detailing.sequence
        dto.brandId = detailing.brand!!.id
        dto.messageTypeId = detailing.messageType!!.id
        dto.prescriptionLevel = detailing.prescriptionLevel
        return dto
    }
}