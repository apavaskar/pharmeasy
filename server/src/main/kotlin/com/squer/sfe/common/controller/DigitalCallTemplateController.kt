package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.DigitalCallTemplate
import com.squer.sfe.common.service.DigitalCallTemplateService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.controller.dto.DigitalCallTemplateDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/digitalcalltemplate")
@RestController
class DigitalCallTemplateController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: DigitalCallTemplateService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): DigitalCallTemplate {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: DigitalCallTemplate): DigitalCallTemplate {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: DigitalCallTemplate): DigitalCallTemplate {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-brand/{brandId}/{typeId}")
    fun getByBrand(@PathVariable brandId: String, @PathVariable typeId: String): List<DigitalCallTemplateDTO> {
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("dictm_brand_id",brandId)
        valueMap.put("dictm_is_active", true)
        if(typeId !="0")
            valueMap.put("dictm_call_type_id",typeId)

        var dtoList = mutableListOf<DigitalCallTemplateDTO>()
        entityService.findByParams(valueMap).forEach{
            dtoList.add(
                DigitalCallTemplateDTO(
                    it.id!!.id,
                    it.brand,
                    it.callType,
                    it.templateText
                )
            )
        }
        return dtoList
    }

    @Throws(SquerException::class)
    @GetMapping("/by-location/{locationId}")
    fun getByLocation(@PathVariable locationId: String): List<DigitalCallTemplateDTO> {
        var searchCriteria = SearchCriteria(CommonQueryName.LOCATION_TEMPLATE_SELECT.query)
        searchCriteria.addCondition("locationId",locationId)
        var templates = repository.find(searchCriteria).filterIsInstance<DigitalCallTemplate>()
        var dtoList = mutableListOf<DigitalCallTemplateDTO>()
        templates.forEach{
            dtoList.add(
                DigitalCallTemplateDTO(
                    it.id!!.id,
                    it.brand,
                    it.callType,
                    it.templateText
                )
            )
        }
        return dtoList
    }

}