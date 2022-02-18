package com.squer.sfe.common.controller

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.common.entity.SystemLov
import com.squer.sfe.common.service.SystemLovService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/systemlov")
@RestController
class SystemLovController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: SystemLovService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): SystemLov {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: SystemLov): SystemLov {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: SystemLov): SystemLov {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-type/{type}")
    fun getByType(@PathVariable type: String): List<NamedSquerId> {
        var lovList = mutableListOf<NamedSquerId>()
        var valueMap = mutableMapOf<String,String>()
        valueMap.put("syslv_type",type)
        entityService.findByParams(valueMap).forEach{
            lovList.add(NamedSquerId(it.id!!.id, it.name))
        }
        return lovList
    }
}