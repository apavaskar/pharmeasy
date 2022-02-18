package com.squer.sfe.expense.service

import com.squer.sfe.expense.ExpenseQueryName
import com.squer.sfe.expense.entity.Allowances
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.service.LocationService
import com.squer.sfe.common.service.TownService
import com.squer.sfe.expense.dto.AllowanceDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class AllowancesService {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var townService: TownService

    @Autowired
    lateinit var locationService: LocationService

    fun findById(id: String): Allowances {
        val searchCriteria = SearchCriteria(ExpenseQueryName.ALWNC_SELECT.query)
        searchCriteria.addCondition("alwnc_id", id)
        return repository.find(searchCriteria).filterIsInstance<Allowances>().first()
    }

    fun create(entity: Allowances): Allowances {
        return repository.create(entity) as Allowances
    }

    fun update(entity: Allowances): Allowances {
        return repository.update(entity) as Allowances
    }

    fun findByParams(valueMap: Map<String,Any>): List<Allowances> {
            val searchCriteria = SearchCriteria(ExpenseQueryName.ALWNC_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<Allowances>()
        }

    fun getByEmployee(locationId: String, jobRoleId: String, yyyyMm: Int): List<AllowanceDTO>{
        var town = townService.getLocationTown(locationId)
        var location = locationService.findById(locationId)
        var searchCriteria = SearchCriteria(ExpenseQueryName.EXPENSE_ALLOWANCE_SELECT.query)
        searchCriteria.addCondition("jobId", jobRoleId)
        searchCriteria.addCondition("yyyyMM", yyyyMm)
        searchCriteria.addCondition("townCategory", town.type!!.id)
        searchCriteria.addCondition("divisionId", location.division!!.id)
        var allowances =repository.find(searchCriteria).filterIsInstance<AllowanceDTO>().toMutableList()

        var searchCriteriaLb = SearchCriteria(ExpenseQueryName.EXPENSE_ALLOWANCE_SELECT.query)
        searchCriteriaLb.addCondition("jobId", jobRoleId)
        searchCriteriaLb.addCondition("yyyyMM", yyyyMm)
        searchCriteriaLb.addCondition("divisionId", location.division!!.id)
        searchCriteriaLb.addCondition("typeId", "syslv00000000000000000000000000000185")
        var lbAllowances = repository.find(searchCriteriaLb).filterIsInstance<AllowanceDTO>().toMutableList()

        allowances.addAll(lbAllowances)

        return allowances
    }
}