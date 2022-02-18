package com.squer.sfe.reporting.controller

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.reporting.entity.DailyVisitAttendee
import com.squer.sfe.reporting.service.DailyVisitAttendeeService
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.controller.EmployeeController
import com.squer.sfe.common.controller.dto.EmployeeDTO
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.controller.dto.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import javax.inject.Named
import kotlin.jvm.Throws

@RequestMapping("/dailyvisitattendee")
@RestController
class DailyVisitAttendeeController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: DailyVisitAttendeeService

    @Autowired
    lateinit var employeeController: EmployeeController

    @Autowired
    lateinit var rcpaController: VisitRcpaController

    @Autowired
    lateinit var visitInputsController: VisitInputsController

    @Autowired
    lateinit var visitPobController: VisitPobController

    @Autowired
    lateinit var joineeController: DailyVisitJoineeController

    @Autowired
    lateinit var visitDetailingController: VisitDetailingController

    @Autowired
    lateinit var digitalVisitController: DigitalVisitController

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): DailyVisitAttendee {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: DailyVisitAttendee): DailyVisitAttendee {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: DailyVisitAttendee): DailyVisitAttendee {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/markVisit")
    fun markVisit(@RequestBody attendeeVisitDTO: AttendeeVisitDTO): Boolean {
        return entityService.markVisit(attendeeVisitDTO)
    }

    @Throws(SquerException::class)
    @PutMapping("/delete/{id}")
    fun deleteVisit(@PathVariable id: String): Boolean {
        var attendee = getById(id)
        attendee.isActive = false
        entityService.update(attendee)
        return true
    }

    @Throws(SquerException::class)
    @GetMapping("/by-visit-id/{visitId}")
    fun getByVisitId(@PathVariable visitId: String): List<DailyVisitAttendee> {
        var valueMap = mutableMapOf<String, Any>()
        valueMap.put("dtvat_visit_id",visitId)
        return entityService.findByParams(valueMap)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-employee-period/{employeeId}/{dir}/{fromYearMonth}/{toYearMonth}")
    fun getAttendeeByEmployeeForPeriod (@PathVariable employeeId: String,
                                        @PathVariable dir: String,
                                        @PathVariable fromYearMonth: Int,
                                        @PathVariable toYearMonth: Int): List<EmployeeWiseAttendeeDTO> {
        var attendeeDtoList = mutableListOf<AttendeeDTO>()
        var employee = employeeController.getById(employeeId)

        var rcpaMap = mutableMapOf<String, MutableList<RcpaDTO>>()
        var inutMap = mutableMapOf<String, MutableList<InputDTO>>()
        var pobMap = mutableMapOf<String,MutableList<PobDTO>>()
        var joineeMap = mutableMapOf<String,MutableList<JoineeDTO>>()
        var detailingMap = mutableMapOf<String, MutableList<DetailingDTO>>()
        var digitalVisitMap = mutableMapOf<String, MutableList<DigitalVisitDTO>>()

        if(dir.toLowerCase() == "employee") {

            //get all rcpa
            var rcpaDtoList =
                rcpaController.getByEmployee(employee.profiles!![0].location!!.id, fromYearMonth, toYearMonth)
            rcpaDtoList.forEach {
                if (rcpaMap.containsKey(it.attendeeId)) {
                    var list = rcpaMap.get(it.attendeeId)
                    list!!.add(it)
                } else {
                    var list = mutableListOf<RcpaDTO>()
                    list!!.add(it)
                    rcpaMap.put(it.attendeeId!!, list)
                }
            }

            //get all inputs
            var inputDtoList =
                visitInputsController.getByEmployee(employee.profiles!![0].location!!.id, fromYearMonth, toYearMonth)
            inputDtoList.forEach {
                if (inutMap.containsKey(it.attendeeId)) {
                    var list = inutMap.get(it.attendeeId)
                    list!!.add(it)
                } else {
                    var list = mutableListOf<InputDTO>()
                    list!!.add(it)
                    inutMap.put(it.attendeeId!!, list)
                }
            }

            //get all pob
            var pobDtoList =
                visitPobController.getByEmployee(employee.profiles!![0].location!!.id, fromYearMonth, toYearMonth)
            pobDtoList.forEach {
                if (pobMap.containsKey(it.attendeeId)) {
                    var list = pobMap.get(it.attendeeId)
                    list!!.add(it)
                } else {
                    var list = mutableListOf<PobDTO>()
                    list!!.add(it)
                    pobMap.put(it.attendeeId!!, list)
                }
            }

            //get all joinee
            var joineeList = joineeController.getByEmployee(employee.profiles!![0].location!!.id, fromYearMonth, toYearMonth)
            joineeList.forEach {
                if(joineeMap.containsKey(it.attendeeId)){
                    var list = joineeMap.get(it.attendeeId)
                    list!!.add(it)
                } else {
                    var list = mutableListOf<JoineeDTO>()
                    list!!.add(it)
                    joineeMap.put(it.attendeeId!!, list)
                }
            }

            //get all visit detailing
            var detailingList = visitDetailingController.getByEmployee(employee.profiles!![0].location!!.id, fromYearMonth, toYearMonth)
            detailingList.forEach {
                if(detailingMap.containsKey(it.attendeeId!!)){
                    var list = detailingMap.get(it.attendeeId!!)
                    list!!.add(it)
                } else {
                    var list = mutableListOf<DetailingDTO>()
                    list!!.add(it)
                    detailingMap.put(it.attendeeId!!,list)
                }
            }

            //get all digital visits
            var digitalVisitList = digitalVisitController.getByEmployee(employee.profiles!![0].location!!.id, fromYearMonth, toYearMonth)
            digitalVisitList.forEach {
                if(digitalVisitMap.containsKey(it.attendeeId!!)){
                    var list = digitalVisitMap.get(it.attendeeId!!)
                    list!!.add(it)
                } else {
                    var list = mutableListOf<DigitalVisitDTO>()
                    list!!.add(it)
                    digitalVisitMap.put(it.attendeeId!!, list)
                }
            }
        }

        val searchCriteria = SearchCriteria(ReportingQueryName.ATTENDEE_FOR_PERIOD_SELECT.query)
        searchCriteria.addCondition(dir.toLowerCase(),true)
        searchCriteria.addCondition("byMonth",true)
        searchCriteria.addCondition("employeeId", employeeId)
        searchCriteria.addCondition("locationId", employee.profiles!![0].location!!.id)
        searchCriteria.addCondition("fromDate", fromYearMonth)
        searchCriteria.addCondition("toDate", toYearMonth)
        searchCriteria.addCondition("isActive", true)
        var attendeeList = repository.find(searchCriteria).filterIsInstance<DailyVisitAttendee>()
        attendeeList.forEach{
            var rcl = if(rcpaMap.containsKey(it.id!!.id)) rcpaMap.get(it.id!!.id) else mutableListOf<RcpaDTO>()
            var inl = if(inutMap.containsKey(it.id!!.id)) inutMap.get(it.id!!.id) else mutableListOf<InputDTO>()
            var pbl = if(pobMap.containsKey(it.id!!.id)) pobMap.get(it.id!!.id) else mutableListOf<PobDTO>()
            var joinee = if(joineeMap.containsKey(it.id!!.id)) joineeMap.get(it.id!!.id) else mutableListOf<JoineeDTO>()
            var detailing = if(detailingMap.containsKey(it.id!!.id)) detailingMap.get(it.id!!.id) else mutableListOf<DetailingDTO>()
            var digitalVisit = if(digitalVisitMap.containsKey(it.id!!.id)) digitalVisitMap.get(it.id!!.id) else mutableListOf<DigitalVisitDTO>()


            attendeeDtoList.add(
                AttendeeDTO(
                    it.id,
                    it.plan,
                    it.activityType,
                    it.activityTypeId,
                    it.customer,
                    it.yyyyMm,
                    it.yyyyMmDd,
                    it.location,
                    it.employee,
                    it.isPlanned,
                    it.isReported,
                    it.isJoint,
                    it.isRcpaDone,
                    it.isVideoShown,
                    it.visitType,
                    it.remarks,
                    it.isActive,
                    it.joineeReference,
                    rcl,
                    inl,
                    pbl,
                    joinee,
                    detailing,
                    digitalVisit
                )
            )
        }

        var employeeAttendeeList = mutableListOf<EmployeeWiseAttendeeDTO>()

        if(dir.toLowerCase() == "employee"){
            var dto = EmployeeWiseAttendeeDTO()
            dto.employee = employeeId
            dto.attendeeList = attendeeDtoList
            employeeAttendeeList.add(dto)
        }else {
            var teamList = employeeController.getMyTeam(employee.profiles?.get(0)!!.location!!.id)
            var employeeAttendeeMap = mutableMapOf<String, MutableList<AttendeeDTO>>()

            teamList.forEach {
                employeeAttendeeMap.put(it.employee!!.id, mutableListOf<AttendeeDTO>())
            }
            attendeeDtoList.forEach {
                var attendeeList = employeeAttendeeMap.get(it.employee!!.id)
                attendeeList?.add(it)
            }
            employeeAttendeeMap.forEach { (k, v) ->
                employeeAttendeeList.add(EmployeeWiseAttendeeDTO(k, v))
            }
        }
        return employeeAttendeeList;
    }
}