package com.squer.sfe.reporting.controller

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.reporting.entity.VisitPob
import com.squer.sfe.reporting.service.VisitPobService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.controller.dto.DetailingDTO
import com.squer.sfe.reporting.controller.dto.PobDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/visitpob")
@RestController
class VisitPobController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: VisitPobService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): VisitPob {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: VisitPob): VisitPob {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: VisitPob): VisitPob {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-attendee/{attendeeId}")
    fun getByAttendeeId(@PathVariable attendeeId: String): List<PobDTO> {
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("vtpob_attendee_id",attendeeId)
        valueMap.put("vtpob_is_active",true)
        var dtoList = mutableListOf<PobDTO>()
        entityService.findByParams(valueMap).forEach{
            dtoList.add(mapToDTO(it))
        }
        return dtoList
    }

    @Throws(SquerException::class)
    @GetMapping("/by-employee/{locationId}/{fromMonth}/{toMonth}")
    fun getByEmployee(@PathVariable locationId: String, @PathVariable fromMonth: Int, @PathVariable toMonth: Int): List<PobDTO> {
        var searchCriteria = SearchCriteria(ReportingQueryName.POB_FOR_EMPLOYEE_SELECT.query)
        searchCriteria.addCondition("locationId",locationId)
        searchCriteria.addCondition("fromMonth",fromMonth)
        searchCriteria.addCondition("toMonth",toMonth)
        var pobList = repository.find(searchCriteria).filterIsInstance<VisitPob>()
        var pobDtoList = mutableListOf<PobDTO>()
        pobList.forEach{
            pobDtoList.add(mapToDTO(it))
        }
        return pobDtoList
    }

    @Throws(SquerException::class)
    @PutMapping("/create-pob")
    fun createPob(@RequestBody dtos: List<PobDTO>): List<PobDTO> {
        var dtoList = mutableListOf<PobDTO>()
        dtos.forEach{
            if(it.pobId == null){
                var pob = VisitPob()
                pob.attendee = SquerId(it.attendeeId!!)
                pob.product = NamedSquerId(it.productId!!,"")
                pob.quantity = it.quantity
                pob.isActive = true
                dtoList.add(mapToDTO(entityService.create(pob)))
            }else{
                var pob = getById(it.pobId!!)
                pob.attendee = SquerId(it.attendeeId!!)
                pob.product = NamedSquerId(it.productId!!,"")
                pob.quantity = it.quantity
                dtoList.add(mapToDTO(entityService.update(pob)))
            }
        }
        return dtoList
    }

    @Throws(SquerException::class)
    @PutMapping("/delete/{id}")
    fun deleteEntity(@PathVariable id: String): Boolean {
        var pob = getById(id)
        pob.isActive = false
        entityService.update(pob)
        return true
    }

    fun mapToDTO(pob: VisitPob): PobDTO{
        var dto = PobDTO()
        dto.pobId = pob.id!!.id
        dto.attendeeId = pob.attendee!!.id
        dto.productId = pob.product!!.id
        dto.quantity = pob.quantity
        return dto
    }
}