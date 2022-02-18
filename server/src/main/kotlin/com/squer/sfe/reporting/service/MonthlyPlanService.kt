package com.squer.sfe.reporting.service

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.MonthlyPlan
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.text.SimpleDateFormat
import java.util.*

@Service
class MonthlyPlanService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): MonthlyPlan {
        val searchCriteria = SearchCriteria(ReportingQueryName.MTPLN_SELECT.query)
        searchCriteria.addCondition("mtpln_id", id)
        return repository.find(searchCriteria).filterIsInstance<MonthlyPlan>().first()
    }

    fun create(entity: MonthlyPlan): MonthlyPlan {
        return repository.create(entity) as MonthlyPlan
    }

    fun update(entity: MonthlyPlan): MonthlyPlan {
        return repository.update(entity) as MonthlyPlan
    }

    fun findByParams(valueMap: Map<String,Any>): List<MonthlyPlan> {
            val searchCriteria = SearchCriteria(ReportingQueryName.MTPLN_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<MonthlyPlan>()
    }

    fun createPlan(employeeId: String, locationId: String, year: Int, yearMonth: Int): MonthlyPlan {
        var monthlyPlan: MonthlyPlan = MonthlyPlan()
        monthlyPlan.employee = NamedSquerId(employeeId,"")
        monthlyPlan.location = NamedSquerId(locationId,"")
        monthlyPlan.status = NamedSquerId("syslv00000000000000000000000000000007","")
        monthlyPlan.year = year
        monthlyPlan.yearMonth = yearMonth
        return repository.create(monthlyPlan) as MonthlyPlan
    }
}