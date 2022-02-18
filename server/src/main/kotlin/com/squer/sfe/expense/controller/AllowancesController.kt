package com.squer.sfe.expense.controller

import com.squer.sfe.expense.entity.Allowances
import com.squer.sfe.expense.service.AllowancesService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.expense.dto.AllowanceDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/allowances")
@RestController
class AllowancesController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: AllowancesService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Allowances {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PostMapping("/create")
    fun createEntity(@RequestBody entity: Allowances): Allowances {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Allowances): Allowances {
        return entityService.update(entity)
    }

    @GetMapping("/by-employee/{locationId}/{jobId}/{yyyyMm}")
    fun getByEmployee(@PathVariable locationId: String, @PathVariable jobId: String, @PathVariable yyyyMm: Int): List<AllowanceDTO> {
       return entityService.getByEmployee(locationId,jobId,yyyyMm)
    }
}