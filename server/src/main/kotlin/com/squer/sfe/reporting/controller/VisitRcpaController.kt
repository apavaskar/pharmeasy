package com.squer.sfe.reporting.controller

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.reporting.entity.VisitRcpa
import com.squer.sfe.reporting.service.VisitRcpaService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.controller.dto.RcpaDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/visitrcpa")
@RestController
class VisitRcpaController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: VisitRcpaService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): VisitRcpa {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: VisitRcpa): VisitRcpa {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: VisitRcpa): VisitRcpa {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-attendee/{attendeeId}")
    fun getByAttendeeId(@PathVariable attendeeId: String): List<RcpaDTO> {
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("vrcpa_attendee_id",attendeeId)
        valueMap.put("vrcpa_is_active",true)
        var dtoList = mutableListOf<RcpaDTO>()
        entityService.findByParams(valueMap).forEach{
            dtoList.add(mapToDTO(it))
        }
        return dtoList
    }

    @Throws(SquerException::class)
    @GetMapping("/by-employee/{locationId}/{fromMonth}/{toMonth}")
    fun getByEmployee(@PathVariable locationId: String, @PathVariable fromMonth: Int, @PathVariable toMonth: Int): List<RcpaDTO> {
        var searchCriteria = SearchCriteria(ReportingQueryName.RCPA_FOR_EMPLOYEE_SELECT.query)
        searchCriteria.addCondition("locationId",locationId)
        searchCriteria.addCondition("fromMonth", fromMonth)
        searchCriteria.addCondition("toMonth", toMonth)
        var rcpaList= repository.find(searchCriteria).filterIsInstance<VisitRcpa>()
        var rcpaDtoList = mutableListOf<RcpaDTO>()
        rcpaList.forEach{
            rcpaDtoList.add(mapToDTO(it))
        }
        return rcpaDtoList
    }

    @Throws(SquerException::class)
    @PutMapping("/create-rcpa")
    fun createRCPA(@RequestBody dtos: List<RcpaDTO>): List<RcpaDTO> {
        var dtoList = mutableListOf<RcpaDTO>()
        dtos.forEach {
            var dto = it
            if (dto.rcpaId == null) {
                var rcpa = VisitRcpa()
                rcpa.attendee = SquerId(dto.attendeeId!!)
                rcpa.chemist = NamedSquerId(dto.chemistId!!, "")
                rcpa.doctor = NamedSquerId(dto.doctorId!!, "")
                rcpa.brand = NamedSquerId(dto.brandId!!, "")
                rcpa.product = NamedSquerId(dto.productId!!,"")
                rcpa.quantity = dto.quantity
                rcpa.value = dto.value
                rcpa.rxn = dto.rxn
                rcpa.competitionQuantity = dto.competitionQuantity
                rcpa.competitionRxn = dto.competitionRxn
                rcpa.competitionValue = dto.competitionValue
                rcpa.type = NamedSquerId(dto.typeId!!, "")
                rcpa.isActive = true
                dtoList.add(mapToDTO(entityService.create(rcpa)))
            } else {
                var rcpa = getById(dto.rcpaId!!)
                rcpa.quantity = dto.quantity
                rcpa.value = dto.value
                rcpa.type = NamedSquerId(dto.typeId!!, "")
                dtoList.add(mapToDTO(entityService.update(rcpa)))
            }
        }
        return dtoList
    }

    @Throws(SquerException::class)
    @PutMapping("/delete/{id}")
    fun deleteEntity(@PathVariable id: String): Boolean {
        var rcpa = getById(id)
        rcpa.isActive = false
        entityService.update(rcpa)
        return true
    }

    fun mapToDTO(rcpa: VisitRcpa): RcpaDTO{
        var dto = RcpaDTO()
        dto.rcpaId = rcpa.id!!.id
        dto.attendeeId = rcpa.attendee!!.id
        dto.chemistId = rcpa.chemist!!.id
        dto.doctorId = rcpa.doctor!!.id
        dto.brandId = rcpa.brand!!.id
        dto.productId = rcpa.product!!.id
        dto.rxn = rcpa.rxn
        dto.value = rcpa.value
        dto.quantity = rcpa.quantity
        dto.competitionQuantity = rcpa.competitionQuantity
        dto.competitionRxn = rcpa.competitionRxn
        dto.competitionValue = rcpa.competitionValue
        dto.typeId = rcpa.type!!.id
        return dto
    }


}