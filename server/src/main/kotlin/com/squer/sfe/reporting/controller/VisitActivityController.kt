package com.squer.sfe.reporting.controller

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.reporting.entity.VisitActivity
import com.squer.sfe.reporting.service.VisitActivityService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.reporting.controller.dto.ActivityDTO
import com.squer.sfe.reporting.controller.dto.DetailingDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/visitactivity")
@RestController
class VisitActivityController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: VisitActivityService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): VisitActivity {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: VisitActivity): VisitActivity {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: VisitActivity): VisitActivity {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-attendee/{attendeeId}")
    fun getByAttendeeId(@PathVariable attendeeId: String): List<ActivityDTO> {
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("vactv_attendee_id",attendeeId)
        valueMap.put("vactv_is_active",true)
        var dtoList = mutableListOf<ActivityDTO>()
        entityService.findByParams(valueMap).forEach{
            dtoList.add(mapToDTO(it))
        }
        return dtoList
    }

    @Throws(SquerException::class)
    @PutMapping("/create-activity")
    fun createActivity(@RequestBody dtos: List<ActivityDTO>): List<ActivityDTO> {
        var dtoList = mutableListOf<ActivityDTO>()
        dtos.forEach{
            if(it.activityId == null){
                var activity = VisitActivity()
                activity.attendee = SquerId(it.attendeeId!!)
                activity.type = NamedSquerId(it.typeId!!,"")
                activity.duration = it.duration
                activity.brand = NamedSquerId(it.brandId!!,"")
                activity.attendees = it.noOfAttendees
                activity.leads = it.noOfLeads
                activity.isActive = true
                dtoList.add(mapToDTO(entityService.create(activity)))
            }else{
                var activity = getById(it.activityId!!)
                activity.attendee = SquerId(it.attendeeId!!)
                activity.type = NamedSquerId(it.typeId!!,"")
                activity.duration = it.duration
                activity.brand = NamedSquerId(it.brandId!!,"")
                activity.attendees = it.noOfAttendees
                activity.leads = it.noOfLeads
                dtoList.add(mapToDTO(entityService.update(activity)))
            }
        }
        return dtoList
    }

    @Throws(SquerException::class)
    @PutMapping("/delete/{id}")
    fun deleteEntity(@PathVariable id: String): Boolean {
        var activity = getById(id)
        activity.isActive = false
        entityService.update(activity)
        return true
    }

    fun mapToDTO(activity: VisitActivity): ActivityDTO{
        var dto = ActivityDTO()
        dto.activityId = activity.id!!.id
        dto.attendeeId = activity.attendee!!.id
        dto.typeId = activity.type!!.id
        dto.duration = activity.duration
        dto.brandId = activity.brand!!.id
        dto.noOfAttendees = activity.attendees
        dto.noOfLeads = activity.leads
        return dto
    }
}