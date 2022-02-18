package com.squer.sfe.reporting.service

import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.VisitInputs
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.inventory.service.InventoryStockService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class VisitInputsService {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var inventoryStockService: InventoryStockService

    fun findById(id: String): VisitInputs {
        val searchCriteria = SearchCriteria(ReportingQueryName.VINPT_SELECT.query)
        searchCriteria.addCondition("vinpt_id", id)
        return repository.find(searchCriteria).filterIsInstance<VisitInputs>().first()
    }

    fun create(entity: VisitInputs): VisitInputs {
        return repository.create(entity) as VisitInputs
    }

    fun update(entity: VisitInputs): VisitInputs {
        return repository.update(entity) as VisitInputs
    }

    fun findByParams(valueMap: Map<String,Any>): List<VisitInputs> {
            val searchCriteria = SearchCriteria(ReportingQueryName.VINPT_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<VisitInputs>()
    }

    fun distributeInputs(entity: VisitInputs, employeeId: String): VisitInputs {
        inventoryStockService.distributeStock(employeeId, entity.input!!.id,entity.quantity!!)
        return create(entity)
    }

    fun inwardInputs(entity: VisitInputs, employeeId: String): VisitInputs {
        inventoryStockService.inwardStock(employeeId, entity.input!!.id,entity.quantity!!)
        return update(entity)
    }

    fun deactivateById(visitInputId: String, employeeId: String): VisitInputs {
        try{
            var input = findById(visitInputId)
            input.isActive = false
            return inwardInputs(input,employeeId)
        }catch (e:Exception){
            throw e
        }
    }
}