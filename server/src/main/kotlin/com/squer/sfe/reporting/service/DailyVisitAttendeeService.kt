package com.squer.sfe.reporting.service

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.DailyVisitAttendee
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.reporting.controller.dto.AttendeeVisitDTO
import com.squer.sfe.reporting.entity.DailyVisitJoinee
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class DailyVisitAttendeeService {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var dailyVisitJoineeService: DailyVisitJoineeService

    fun findById(id: String): DailyVisitAttendee {
        val searchCriteria = SearchCriteria(ReportingQueryName.DTVAT_SELECT.query)
        searchCriteria.addCondition("dtvat_id", id)
        return repository.find(searchCriteria).filterIsInstance<DailyVisitAttendee>().first()
    }

    fun create(entity: DailyVisitAttendee): DailyVisitAttendee {
        return repository.create(entity) as DailyVisitAttendee
    }

    fun update(entity: DailyVisitAttendee): DailyVisitAttendee {
        return repository.update(entity) as DailyVisitAttendee
    }

    fun findByParams(valueMap: Map<String,Any>): List<DailyVisitAttendee> {
            val searchCriteria = SearchCriteria(ReportingQueryName.DTVAT_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<DailyVisitAttendee>()
    }

    fun markVisit(attendeeVisitDTO: AttendeeVisitDTO): Boolean {
        try {
            var attendee = findById(attendeeVisitDTO.attendeeId!!)
            if(attendeeVisitDTO.isVisited!!){
                attendee.isReported = true
                attendee.isJoint = attendeeVisitDTO.isJoint
                attendee.visitType = NamedSquerId(attendeeVisitDTO.visitTypeId!!,"")
                attendee.remarks = attendeeVisitDTO.remarks
                attendee.isRcpaDone = attendeeVisitDTO.isRcapDone
                attendee.isVideoShown = attendeeVisitDTO.isVideoShown
                repository.update(attendee)
                attendeeVisitDTO.managers!!.forEach{
                    var joinee= DailyVisitJoinee()
                    joinee.attendee = attendee.id
                    joinee.manager = NamedSquerId(it,"")
                    joinee.isActive = true
                    dailyVisitJoineeService.create(joinee)
                }
            } else {
                attendee.isReported = false
                attendee.isJoint = false
                attendee.remarks = null
                repository.update(attendee)
                dailyVisitJoineeService.deactivateJoineeByAttendee(attendee.id!!.id)
            }
            return true
        }catch (e: Exception){
            throw Exception(e)
        }
    }

    fun getAttendeesForPeriodByEmployee(locationId: String, fromDate: Int, toDate: Int, byDate: Boolean, byMonth: Boolean):List<DailyVisitAttendee>{
        var searchCriteria = SearchCriteria(ReportingQueryName.ATTENDEE_FOR_PERIOD_SELECT.query)
        searchCriteria.addCondition("employee",true)
        searchCriteria.addCondition("isActive", true)
        searchCriteria.addCondition("isReported",true)
        searchCriteria.addCondition("locationId",locationId)
        searchCriteria.addCondition("fromDate", fromDate)
        searchCriteria.addCondition("toDate", toDate)
        if(byDate)
            searchCriteria.addCondition("byDate",true)
        if(byMonth)
            searchCriteria.addCondition("byMonth",true)

        return repository.find(searchCriteria).filterIsInstance<DailyVisitAttendee>()
    }
}