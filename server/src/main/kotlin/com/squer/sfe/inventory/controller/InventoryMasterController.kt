package com.squer.sfe.inventory.controller

import com.squer.sfe.inventory.entity.InventoryMaster
import com.squer.sfe.inventory.service.InventoryMasterService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.inventory.InventoryQueryName
import com.squer.sfe.inventory.controller.dto.InventoryListDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.*
import kotlin.jvm.Throws

@RequestMapping("/inventorymaster")
@RestController
class InventoryMasterController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: InventoryMasterService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): InventoryMaster {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: InventoryMaster): InventoryMaster {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: InventoryMaster): InventoryMaster {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-employee/{employeeId}")
    fun getByEmployee(@PathVariable employeeId: String, @RequestParam(defaultValue = "0") type: String, @RequestParam(defaultValue = "0") item: String): List<InventoryListDTO> {
        return entityService.getByEmployee(employeeId,type,item)
    }
}