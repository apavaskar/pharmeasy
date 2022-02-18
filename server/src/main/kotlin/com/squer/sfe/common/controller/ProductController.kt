package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.Product
import com.squer.sfe.common.service.ProductService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.service.LocationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/product")
@RestController
class ProductController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: ProductService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Product {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: Product): Product {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Product): Product {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-location/{locationId}")
    fun getProductByLocation(@PathVariable locationId: String):List<Product> {
        return entityService.getByLocation(locationId)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-brand/{brandId}")
    fun getProductByBrand(@PathVariable brandId: String):List<Product> {
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("prcdt_brand_id",brandId)
        valueMap.put("prcdt_is_active",true)
        return entityService.findByParams(valueMap)
    }
}