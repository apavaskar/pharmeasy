package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Product
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ProductService {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var locationService: LocationService

    fun findById(id: String): Product {
        val searchCriteria = SearchCriteria(CommonQueryName.PRCDT_SELECT.query)
        searchCriteria.addCondition("prcdt_id", id)
        return repository.find(searchCriteria).filterIsInstance<Product>().first()
    }

    fun create(entity: Product): Product {
        return repository.create(entity) as Product
    }

    fun update(entity: Product): Product {
        return repository.update(entity) as Product
    }

    fun findByParams(valueMap: Map<String,Any>): List<Product> {
        val searchCriteria = SearchCriteria(CommonQueryName.PRCDT_SELECT.query)
        valueMap.forEach {
            searchCriteria.addCondition(it.key, it.value)
        }
        return repository.find(searchCriteria).filterIsInstance<Product>()
    }

    fun getByLocation(locationId: String): List<Product>{
        var location = locationService.findById(locationId)
        var searchCriteria = SearchCriteria(CommonQueryName.PRODUCT_FOR_LOCATION_SELECT.query)
        searchCriteria.addCondition("divisionId",location.division!!.id)
        return repository.find(searchCriteria).filterIsInstance<Product>()
    }
}