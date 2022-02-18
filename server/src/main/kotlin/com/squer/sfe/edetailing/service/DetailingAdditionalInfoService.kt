package com.squer.sfe.edetailing.service

import com.squer.sfe.edetailing.EdetailingQueryName
import com.squer.sfe.edetailing.entity.DetailingAdditionalInfo
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class DetailingAdditionalInfoService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): DetailingAdditionalInfo {
        val searchCriteria = SearchCriteria(EdetailingQueryName.DTLIN_SELECT.query)
        searchCriteria.addCondition("dtlin_id", id)
        return repository.find(searchCriteria).filterIsInstance<DetailingAdditionalInfo>().first()
    }

    fun create(entity: DetailingAdditionalInfo): DetailingAdditionalInfo {
        return repository.create(entity) as DetailingAdditionalInfo
    }

    fun update(entity: DetailingAdditionalInfo): DetailingAdditionalInfo {
        return repository.update(entity) as DetailingAdditionalInfo
    }

    fun findByParams(valueMap: Map<String,Any>): List<DetailingAdditionalInfo> {
            val searchCriteria = SearchCriteria(EdetailingQueryName.DTLIN_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<DetailingAdditionalInfo>()
        }
}