package com.squer.sfe.edetailing.service

import com.squer.sfe.edetailing.EdetailingQueryName
import com.squer.sfe.edetailing.entity.DetailingStatMaster
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class DetailingStatMasterService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): DetailingStatMaster {
        val searchCriteria = SearchCriteria(EdetailingQueryName.DTLMT_SELECT.query)
        searchCriteria.addCondition("dtlmt_id", id)
        return repository.find(searchCriteria).filterIsInstance<DetailingStatMaster>().first()
    }

    fun create(entity: DetailingStatMaster): DetailingStatMaster {
        return repository.create(entity) as DetailingStatMaster
    }

    fun update(entity: DetailingStatMaster): DetailingStatMaster {
        return repository.update(entity) as DetailingStatMaster
    }

    fun findByParams(valueMap: Map<String,Any>): List<DetailingStatMaster> {
            val searchCriteria = SearchCriteria(EdetailingQueryName.DTLMT_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<DetailingStatMaster>()
        }
}