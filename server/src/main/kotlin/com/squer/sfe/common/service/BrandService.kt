package com.squer.sfe.common.service

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Brand
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.controller.dto.BrandDTO
import com.squer.sfe.common.entity.DoctorPotential
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class BrandService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): Brand {
        val searchCriteria = SearchCriteria(CommonQueryName.BRAND_SELECT.query)
        searchCriteria.addCondition("brand_id", id)
        var brand = repository.find(searchCriteria).filterIsInstance<Brand>().first()
        brand.competitorBrandList = getCompetitorBrands(brand.id!!.id)
        return brand
    }

    fun create(entity: Brand): Brand {
        return repository.create(entity) as Brand
    }

    fun update(entity: Brand): Brand {
        return repository.update(entity) as Brand
    }

    fun findByParams(valueMap: Map<String,Any>): List<Brand> {
        val searchCriteria = SearchCriteria(CommonQueryName.BRAND_SELECT.query)
        valueMap.forEach {
            searchCriteria.addCondition(it.key, it.value)
        }
        return repository.find(searchCriteria).filterIsInstance<Brand>()
    }

    fun getCompetitorBrands(brandId: String): List<NamedSquerId> {
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("brand_parent_id", brandId)
        valueMap.put("brand_is_active",true)
        valueMap.put("brand_is_own",false)
        var dtoList = mutableListOf<NamedSquerId>()
        findByParams(valueMap).forEach{
            dtoList.add(NamedSquerId(it.id!!.id, it.name))
        }
        return dtoList;
    }

    fun getCompetitorBrandDTO(brandId: String): List<BrandDTO>{
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("brand_parent_id", brandId)
        valueMap.put("brand_is_active",true)
        valueMap.put("brand_is_own",false)
        var dtoList = mutableListOf<BrandDTO>()
        findByParams(valueMap).forEach{
            dtoList.add(
                BrandDTO(
                    NamedSquerId(it.id!!.id, it.name),
                    it.rcpaValue,
                    it.rxnUnits
                )
            )
        }
        return dtoList;
    }
}