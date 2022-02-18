package com.squer.sfe.edetailing.service

import com.squer.sfe.edetailing.EdetailingQueryName
import com.squer.sfe.edetailing.entity.DetailingStat
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class DetailingStatService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): DetailingStat {
        val searchCriteria = SearchCriteria(EdetailingQueryName.DTLST_SELECT.query)
        searchCriteria.addCondition("dtlst_id", id)
        return repository.find(searchCriteria).filterIsInstance<DetailingStat>().first()
    }

    fun create(entity: DetailingStat): DetailingStat {
        return repository.create(entity) as DetailingStat
    }

    fun update(entity: DetailingStat): DetailingStat {
        return repository.update(entity) as DetailingStat
    }

    fun findByParams(valueMap: Map<String,Any>): List<DetailingStat> {
            val searchCriteria = SearchCriteria(EdetailingQueryName.DTLST_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<DetailingStat>()
        }
}