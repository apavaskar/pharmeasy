package com.squer.sfe.common.controller

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.common.entity.Brand
import com.squer.sfe.common.service.BrandService
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.controller.dto.BrandDTO
import com.squer.sfe.common.controller.dto.RCPAItemDTO
import com.squer.sfe.common.service.LocationService
import com.squer.sfe.common.service.ProductService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/brand")
@RestController
class BrandController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: BrandService

    @Autowired
    lateinit var locationService: LocationService

    @Autowired
    lateinit var productService: ProductService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Brand {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: Brand): Brand {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Brand): Brand {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-location/{locationId}")
    fun getBrandByLocation(@PathVariable locationId: String): List<BrandDTO> {
        var location = locationService.findById(locationId)
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("brand_division_id",location.division!!.id)
        valueMap.put("brand_is_active",true)
        valueMap.put("brand_is_own",true)
        var brands = entityService.findByParams(valueMap)
        var dtoList = mutableListOf<BrandDTO>()

        brands.forEach{
            dtoList.add(
                BrandDTO(
                    NamedSquerId(it.id!!.id,it.name),
                    it.rcpaValue,
                    it.rxnUnits,
                    it.showInDetailing,
                    it.showInRcpa,
                    entityService.getCompetitorBrandDTO(it.id!!.id)
                )
            )
        }
        return dtoList
    }

    @Throws(SquerException::class)
    @GetMapping("/rcpa-items/{locationId}")
    fun getRcpaItems(@PathVariable locationId: String): List<RCPAItemDTO> {
        var location = locationService.findById(locationId)
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("brand_division_id",location.division!!.id)
        valueMap.put("brand_is_active",true)
        valueMap.put("brand_is_own",true)
        var brands = entityService.findByParams(valueMap)
        var products = productService.getByLocation(locationId)
        var dtoList = mutableListOf<RCPAItemDTO>()

        brands.forEach {
            dtoList.add(
                RCPAItemDTO(it.id!!.id, it.name,it.rcpaValue, it.rxnUnits, it.showInDetailing,it.showInRcpa)
            )
        }

        products.forEach {
            dtoList.add(
                RCPAItemDTO(it.id!!.id, it.name,it.rcpaValue,  it.rxnUnits,it.showInDetailing,it.showInRcpa)
            )
        }

        return dtoList
    }
}