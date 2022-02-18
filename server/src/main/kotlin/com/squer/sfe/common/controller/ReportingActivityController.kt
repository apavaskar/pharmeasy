package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.ReportingActivity
import com.squer.sfe.common.service.ReportingActivityService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.controller.dto.ReportingActivityDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/reportingactivity")
@RestController
class ReportingActivityController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: ReportingActivityService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): ReportingActivity {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: ReportingActivity): ReportingActivity {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: ReportingActivity): ReportingActivity {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/types")
    fun getTypes(): List<String> {
        var types = mutableListOf<String>()
        var activityList = entityService.findByParams(mutableMapOf<String, Any>())
        activityList.forEach{
            if(types.indexOf(it.category) < 0)
                it.category?.let { it1 -> types.add(it1) }
        }
        return types
    }

    @Throws(SquerException::class)
    @GetMapping("/by-type/{type}")
    fun getByTypes(@PathVariable type: String): List<ReportingActivityDTO> {
        var activityDTO = mutableListOf<ReportingActivityDTO>()
        var valueMap = mutableMapOf<String, Any>()
        valueMap.put("rpact_category", type)
        var activityList = entityService.findByParams(valueMap)
        activityList.forEach{
            activityDTO.add(ReportingActivityDTO(
                it.id!!.id,
                it.name,
                it!!.duration
            ))
        }
        return activityDTO
    }
}