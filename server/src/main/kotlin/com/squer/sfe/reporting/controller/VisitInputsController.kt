package com.squer.sfe.reporting.controller

import com.squer.sfe.reporting.entity.VisitInputs
import com.squer.sfe.reporting.service.VisitInputsService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.controller.dto.DetailingDTO
import com.squer.sfe.reporting.controller.dto.InputDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/visitinputs")
@RestController
class VisitInputsController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: VisitInputsService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): VisitInputs {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: VisitInputs): VisitInputs {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: VisitInputs): VisitInputs {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-attendee/{attendeeId}")
    fun getByAttendeeId(@PathVariable attendeeId: String): List<InputDTO> {
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("vinpt_attendee_id",attendeeId)
        valueMap.put("vinpt_is_active",true)
        var dtoList = mutableListOf<InputDTO>()
        entityService.findByParams(valueMap).forEach{
            dtoList.add(mapToDTO(it))
        }
        return dtoList
    }

    @Throws(SquerException::class)
    @GetMapping("/by-employee/{locationId}/{fromMonth}/{toMonth}")
    fun getByEmployee(@PathVariable locationId: String, @PathVariable fromMonth: Int, @PathVariable toMonth: Int): List<InputDTO> {
        var searchCriteria = SearchCriteria(ReportingQueryName.INPUT_FOR_EMPLOYEE_SELECT.query)
        searchCriteria.addCondition("locationId",locationId)
        searchCriteria.addCondition("fromMonth",fromMonth)
        searchCriteria.addCondition("toMonth",toMonth)
        return repository.find(searchCriteria).filterIsInstance<InputDTO>()
    }


    @Throws(SquerException::class)
    @PutMapping("/create-input")
    fun createInput(@RequestBody dtos: List<InputDTO>): List<InputDTO> {
        var dtoList = mutableListOf<InputDTO>()
        dtos.forEach{
            if(it.inputId == null){
                var input = VisitInputs()
                input.attendee = SquerId(it.attendeeId!!)
                input.quantity = it.quantity
                input.isActive = true
                dtoList.add(mapToDTO(entityService.create(input)))
            }else{
                var input = getById(it.inputId!!)
                input.attendee = SquerId(it.attendeeId!!)
                input.quantity = it.quantity
                dtoList.add(mapToDTO(entityService.update(input)))
            }
        }

        return dtoList
    }

    @Throws(SquerException::class)
    @PutMapping("/delete/{id}")
    fun deleteEntity(@PathVariable id: String): Boolean {
        var input = getById(id)
        input.isActive = false
        entityService.update(input)
        return true
    }

    fun mapToDTO(input: VisitInputs): InputDTO{
        var dto = InputDTO()
        dto.inputId = input.id!!.id
        dto.attendeeId = input.attendee!!.id
        dto.quantity = input.quantity
        return dto
    }
}