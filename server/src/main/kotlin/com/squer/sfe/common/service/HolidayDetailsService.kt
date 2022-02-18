package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.HolidayDetails
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class HolidayDetailsService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): HolidayDetails {
        val searchCriteria = SearchCriteria(CommonQueryName.HLDTL_SELECT.query)
        searchCriteria.addCondition("hldtl_id", id)
        return repository.find(searchCriteria).filterIsInstance<HolidayDetails>().first()
    }

    fun create(entity: HolidayDetails): HolidayDetails {
        return repository.create(entity) as HolidayDetails
    }

    fun update(entity: HolidayDetails): HolidayDetails {
        return repository.update(entity) as HolidayDetails
    }

    fun findByParams(valueMap: Map<String,Any>): List<HolidayDetails> {
            val searchCriteria = SearchCriteria(CommonQueryName.HLDTL_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<HolidayDetails>()
        }
}