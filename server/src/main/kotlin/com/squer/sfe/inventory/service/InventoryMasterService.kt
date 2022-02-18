package com.squer.sfe.inventory.service

import com.squer.sfe.inventory.InventoryQueryName
import com.squer.sfe.inventory.entity.InventoryMaster
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.inventory.controller.dto.InventoryListDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.*

@Service
class InventoryMasterService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): InventoryMaster {
        val searchCriteria = SearchCriteria(InventoryQueryName.INVMT_SELECT.query)
        searchCriteria.addCondition("invmt_id", id)
        return repository.find(searchCriteria).filterIsInstance<InventoryMaster>().first()
    }

    fun create(entity: InventoryMaster): InventoryMaster {
        return repository.create(entity) as InventoryMaster
    }

    fun update(entity: InventoryMaster): InventoryMaster {
        return repository.update(entity) as InventoryMaster
    }

    fun findByParams(valueMap: Map<String,Any>): List<InventoryMaster> {
            val searchCriteria = SearchCriteria(InventoryQueryName.INVMT_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<InventoryMaster>()
    }

    fun getByEmployee(employeeId: String, typeId: String, itemId: String): List<InventoryListDTO>{
        var yyyyMMDDFormat: DateFormat = SimpleDateFormat("yyyyMMdd")
        var calendar = Calendar.getInstance()
        calendar.time = Date()
        var searchCriteria = SearchCriteria(InventoryQueryName.INVENTORY_FOR_EMPLOYEE_SELECT.query)
        searchCriteria.addCondition("employee",employeeId)
        searchCriteria.addCondition("currentDate", yyyyMMDDFormat.format(calendar.time).toInt())
        searchCriteria.addCondition("isActive", true)
        if(typeId!="0")
            searchCriteria.addCondition("type", typeId)

        if(itemId!="0")
            searchCriteria.addCondition("item", itemId)

        return repository.find(searchCriteria).filterIsInstance<InventoryListDTO>()
    }
}