package com.squer.sfe.reporting.controller

import com.squer.sfe.reporting.entity.DailyVisitJoinee
import com.squer.sfe.reporting.service.DailyVisitJoineeService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.service.EmployeeService
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.controller.dto.JoineeDTO
import com.squer.sfe.reporting.controller.dto.ManagerJoineeDTO
import com.squer.sfe.reporting.controller.enum.JoineeStatusEnum
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RequestMapping("/dailyvisitjoinee")
@RestController
class DailyVisitJoineeController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: DailyVisitJoineeService

    @Autowired
    lateinit var employeeService: EmployeeService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): DailyVisitJoinee {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: DailyVisitJoinee): DailyVisitJoinee {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: DailyVisitJoinee): DailyVisitJoinee {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/mark-visited/{id}/{status}")
    fun markVisited(@PathVariable id: String, @PathVariable status: String): Boolean {
        val visit = repository.restore(SquerId(id)) as DailyVisitJoinee
        if (status == "approved") {
            visit.status = JoineeStatusEnum.APPROVED.status
        } else {
            visit.status = JoineeStatusEnum.REJECTED.status
        }
        entityService.update(visit)
        return true
    }

    @Throws(SquerException::class)
    @GetMapping("/manager-joint-visits/{managerId}/{yyyMm}")
    fun getManagerJointVisits(@PathVariable managerId: String, @PathVariable yyyMm: Int): List<ManagerJoineeDTO> {
        var searchCriteriaNotVisited = SearchCriteria(ReportingQueryName.MANAGER_NOT_VISITED_JOINEE_SELECT.query)
        searchCriteriaNotVisited.addCondition("managerId", managerId)
        searchCriteriaNotVisited.addCondition("yyyyMM",yyyMm)
        //searchCriteriaNotVisited.addCondition("statusId", JoineeStatusEnum.PENDING.status.id)
        var notVisitedList = repository.find(searchCriteriaNotVisited).filterIsInstance<ManagerJoineeDTO>()

        return notVisitedList
    }


    @Throws(SquerException::class)
    @GetMapping("/manager-joint-visits/by-date/{managerId}/{yyyMmDd}")
    fun getManagerJointVisitsForDate(@PathVariable managerId: String, @PathVariable yyyMmDd: Int): List<ManagerJoineeDTO> {
        try {
            var searchCriteriaNotVisited =
                SearchCriteria(ReportingQueryName.MANAGER_NOT_VISITED_DATE_JOINEE_SELECT.query)
            searchCriteriaNotVisited.addCondition("managerId", managerId)
            searchCriteriaNotVisited.addCondition("yyyyMMDd", yyyMmDd)
            //searchCriteriaNotVisited.addCondition("statusId", JoineeStatusEnum.PENDING.status.id)
            return repository.find(searchCriteriaNotVisited).filterIsInstance<ManagerJoineeDTO>()
        }catch (e: Exception) {
            e.printStackTrace()
            return mutableListOf()
        }
    }

    @Throws(SquerException::class)
    @GetMapping("/by-employee/{locationId}/{fromMonth}/{toMonth}")
    fun getByEmployee(@PathVariable locationId: String, @PathVariable fromMonth: Int, @PathVariable toMonth: Int):List<JoineeDTO>{
        var searchCriteria = SearchCriteria(ReportingQueryName.JOINEE_FOR_EMPLOYEE_SELECT.query)
        searchCriteria.addCondition("locationId",locationId)
        searchCriteria.addCondition("fromMonth", fromMonth)
        searchCriteria.addCondition("toMonth", toMonth)
        var joineeList = repository.find(searchCriteria).filterIsInstance<DailyVisitJoinee>()
        var dtoList = mutableListOf<JoineeDTO>()
        joineeList.forEach {
            var dto = JoineeDTO()
            dto.entityId = it.id!!.id
            dto.attendeeId = it.attendee!!.id
            dto.managerId = it.manager!!.id
            dtoList.add(dto)
        }
        return dtoList
    }
}