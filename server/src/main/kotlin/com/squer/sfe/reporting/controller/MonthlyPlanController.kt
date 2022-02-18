package com.squer.sfe.reporting.controller

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.reporting.entity.MonthlyPlan
import com.squer.sfe.reporting.service.MonthlyPlanService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.security.SecurityExceptionCode
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.service.EmployeeProfileService
import com.squer.sfe.common.service.EmployeeService
import com.squer.sfe.common.service.LocationService
import com.squer.sfe.reporting.controller.dto.MonthlyPlanDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.text.SimpleDateFormat
import java.util.*
import kotlin.jvm.Throws
import kotlin.reflect.jvm.internal.impl.load.kotlin.JvmType

@RequestMapping("/monthlyplan")
@RestController
class MonthlyPlanController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: MonthlyPlanService

    @Autowired
    lateinit var employeeProfileService: EmployeeProfileService

    @Autowired
    lateinit var locationService: LocationService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): MonthlyPlan {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: MonthlyPlan): MonthlyPlan {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: MonthlyPlan): MonthlyPlan {
        return entityService.update(entity)
    }

    fun getPlanList(locationId: String,yyyyMm: Int): List<MonthlyPlan>{
        var valueMap = mutableMapOf<String, Any>()
        valueMap.put("mtpln_location_id",locationId)
        valueMap.put("mtpln_year_month", yyyyMm)
        return entityService.findByParams(valueMap)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-employee/{employeeId}/{yyyyMm}")
    fun getPlanningDetails(@PathVariable employeeId: String, @PathVariable yyyyMm: Int): MonthlyPlanDTO {
        var planList = getPlanList(employeeId,yyyyMm)
        if(planList.isEmpty())
            throw SquerException(SecurityExceptionCode.PLAN_IS_NOT_CREATED, "Plan is not created", null)
        else
            return MonthlyPlanDTO(planList[0].id,planList[0].status,planList[0].employee,planList[0].location, planList[0].year)
    }

    @Throws(SquerException::class)
    @GetMapping("/create-for-user/{locationId}/{yyyyMm}")
    fun createPlanForUser(@PathVariable locationId: String, @PathVariable yyyyMm: Int): MonthlyPlanDTO {
        try {
            //check if plan exists
            var planList = getPlanList(locationId, yyyyMm)
            if (!planList.isEmpty())
                return MonthlyPlanDTO(
                    planList[0].id,
                    planList[0].status,
                    planList[0].employee,
                    planList[0].location,
                    planList[0].year
                )

            //create new plan
            val dateFormat = SimpleDateFormat("yyyyMM")
            val calendar = Calendar.getInstance()
            calendar.time = dateFormat.parse(yyyyMm.toString())
            var valueMap = mutableMapOf<String, Any>()
            valueMap.put("emprf_location_id", locationId)
            valueMap.put("emprf_is_active", true)
            valueMap.put("emprf_is_default", true)
            var profileList = employeeProfileService.findByParams(valueMap)
            var plan = entityService.createPlan(
                profileList[0].employee!!.id,
                profileList[0].location!!.id,
                calendar.get(Calendar.YEAR),
                yyyyMm
            )
            return MonthlyPlanDTO(plan.id, plan.status, plan.employee, plan.location, plan.year)
        }catch (e:Exception){
            throw e
        }
    }
}