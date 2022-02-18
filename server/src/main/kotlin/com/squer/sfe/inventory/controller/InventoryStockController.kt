package com.squer.sfe.inventory.controller

import com.squer.sfe.inventory.entity.InventoryStock
import com.squer.sfe.inventory.service.InventoryStockService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/inventorystock")
@RestController
class InventoryStockController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: InventoryStockService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): InventoryStock {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: InventoryStock): InventoryStock {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: InventoryStock): InventoryStock {
        return entityService.update(entity)
    }


}