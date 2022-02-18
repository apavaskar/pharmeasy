package com.squer.sfe.reporting.controller

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.reporting.entity.DailyVisit
import com.squer.sfe.reporting.service.DailyVisitService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.reporting.controller.dto.PlanningDTO
import com.squer.sfe.reporting.entity.MonthlyPlan
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.text.SimpleDateFormat
import kotlin.jvm.Throws

@RequestMapping("/dailyvisit")
@RestController
class DailyVisitController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: DailyVisitService
    lateinit var monthlyPlanController: MonthlyPlanController

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): DailyVisit {
        return entityService.findById(id)
    }

/*    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: DailyVisit): DailyVisit {
        return entityService.create(entity)
    }*/

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: DailyVisit): DailyVisit {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-employee/{employeeId}/{yyyymmdd}")
    fun getByEmployee(@PathVariable employeeId: String,@PathVariable yyyymmdd: String): List<DailyVisit> {
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("dtvst_employee_id",employeeId)
        valueMap.put("dtvst_yyyy_mm_dd", yyyymmdd)
        return entityService.findByParams(valueMap)
    }

    @Throws(SquerException::class)
    @PutMapping("/getVisit")
    fun getDailyVisit(@PathVariable monthlyPlanId: String,
                      @PathVariable locationId: String,
                      @PathVariable employeeId: String,
                        @PathVariable activityTypeId: String,
                      @PathVariable yyyymmdd: String): DailyVisit {
        var visitList = getByEmployee(employeeId,yyyymmdd)
        if(visitList.isEmpty()){
            var visit = DailyVisit()
            val yyyyMMdd_dateFormat = SimpleDateFormat("yyyyMMdd")
            val yyyyMM_dateFormat = SimpleDateFormat("yyyyMM")
            visit.plan = SquerId(monthlyPlanId)
            visit.location = NamedSquerId(locationId,"")
            visit.employee = NamedSquerId(employeeId,"")
            visit.visitDate = yyyyMMdd_dateFormat.parse(yyyymmdd)
            visit.yyyyMm = yyyyMM_dateFormat.format(visit.visitDate).toInt()
            visit.yyyyMmDD = yyyymmdd.toInt()
            visit.activityType = NamedSquerId(activityTypeId,"")
            visit.duration = 0.0
            return entityService.create(visit)
        }else {
            return visitList[0]
        }
    }

    @Throws(SquerException::class)
    @PutMapping("/createVisit")
    fun createDailyVisit(@RequestBody planDto: PlanningDTO): Boolean {
        try {
            var monthlyPlanId = planDto.monthlyPlanId
            var dailyVisit: DailyVisit

            // check monthly plan exists
            if(monthlyPlanId == null){
                var monthlyPlan = MonthlyPlan()
                monthlyPlan .yearMonth = planDto.yyyyMM
                monthlyPlan.year = planDto.yyyyMM.toString().take(4).toInt()
                monthlyPlan.location = NamedSquerId(planDto.locationId!!,"")
                monthlyPlan.employee = NamedSquerId(planDto.employeeId!!,"")
                monthlyPlan.status = NamedSquerId("syslv00000000000000000000000000000007","")
                monthlyPlanId = monthlyPlanController.createEntity(monthlyPlan).id!!.id
            }

            // check visit exists for day
            if (planDto.dailyVisitId == null) {
                val dateFormat = SimpleDateFormat("yyyyMMdd")
                var visit = DailyVisit()
                visit.plan = SquerId(planDto.monthlyPlanId!!)
                visit.location = NamedSquerId(planDto.locationId!!,"")
                visit.employee = NamedSquerId(planDto.employeeId!!,"")
                visit.visitDate = dateFormat.parse(planDto.yyyyMMdd.toString())
                visit.yyyyMm = planDto.yyyyMM
                visit.yyyyMmDD = planDto.yyyyMMdd
                visit.activityType = NamedSquerId(planDto.activityId!!, "")
                visit.duration = planDto.duration
                dailyVisit = entityService.create(visit)
            } else {
                dailyVisit = getById(planDto.dailyVisitId!!)
            }
            if(planDto.fieldList!!.isNotEmpty())
                return entityService.createAttendeeForVisit(planDto.fieldList!!, dailyVisit)
            else if(planDto.nonCallList!!.isNotEmpty())
                return entityService.createNonCallVisit(planDto.nonCallList!!, dailyVisit)
            else
                return true
        }catch (e: Exception){
            throw e
        }
    }

}