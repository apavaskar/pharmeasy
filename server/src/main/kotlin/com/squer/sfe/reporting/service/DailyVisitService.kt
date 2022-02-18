package com.squer.sfe.reporting.service

import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.DailyVisit
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.reporting.controller.dto.FieldVisitDTO
import com.squer.sfe.reporting.controller.dto.NonCallActivityDTO
import com.squer.sfe.reporting.entity.DailyVisitAttendee
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.lang.Exception

@Service
class DailyVisitService {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var attendeeService: DailyVisitAttendeeService

    fun findById(id: String): DailyVisit {
        val searchCriteria = SearchCriteria(ReportingQueryName.DTVST_SELECT.query)
        searchCriteria.addCondition("dtvst_id", id)
        return repository.find(searchCriteria).filterIsInstance<DailyVisit>().first()
    }

    fun create(entity: DailyVisit): DailyVisit {
        return repository.create(entity) as DailyVisit
    }

    fun update(entity: DailyVisit): DailyVisit {
        return repository.update(entity) as DailyVisit
    }

    fun findByParams(valueMap: Map<String,Any>): List<DailyVisit> {
            val searchCriteria = SearchCriteria(ReportingQueryName.DTVST_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<DailyVisit>()
    }

    fun createAttendeeForVisit(attendeeList: List<FieldVisitDTO>, visit: DailyVisit): Boolean{
        try{
            attendeeList.forEach{
                var attendee= DailyVisitAttendee()
                attendee.plan = visit.plan
                attendee.employee = visit.employee
                attendee.location = visit.location
                attendee.yyyyMm = visit.yyyyMm
                attendee.yyyyMmDd = visit.yyyyMmDD
                attendee.customer = NamedSquerId(it.customerId!!,"")
                attendee.activityType = NamedSquerId("","")// todo
                attendee.activityTypeId = null
                attendee.isPlanned = it.isPlanned
                attendee.isReported = it.isReported
                attendee.isJoint = it.isJoint
                attendee.visitType= it.visitType
                attendee.remarks = it.remarks
                attendeeService.create(attendee)
            }
            return true
        } catch (e: Exception) {
            throw e
        }
    }

    fun createNonCallVisit(nonCallList: List<NonCallActivityDTO>, visit: DailyVisit): Boolean{
        try{
            nonCallList.forEach{
                var attendee= DailyVisitAttendee()
                attendee.plan = visit.plan
                attendee.employee = visit.employee
                attendee.location = visit.location
                attendee.yyyyMm = visit.yyyyMm
                attendee.yyyyMmDd = visit.yyyyMmDD
                attendee.customer = null
                attendee.activityType = NamedSquerId("","")// todo
                attendee.activityTypeId = NamedSquerId(it.activityTypeId!!,"")
                attendee.isPlanned = it.isPlanned
                attendee.isReported = it.isReported
                attendee.isJoint = false
                attendee.visitType= it.visitType
                attendee.remarks = it.remarks
                attendeeService.create(attendee)
            }
            return true
        }catch (e: Exception){
            throw e
        }
    }
}