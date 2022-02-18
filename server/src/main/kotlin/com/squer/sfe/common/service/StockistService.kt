package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Stockist
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class StockistService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): Stockist {
        val searchCriteria = SearchCriteria(CommonQueryName.STCKT_SELECT.query)
        searchCriteria.addCondition("stckt_id", id)
        return repository.find(searchCriteria).filterIsInstance<Stockist>().first()
    }

    fun create(entity: Stockist): Stockist {
        return repository.create(entity) as Stockist
    }

    fun update(entity: Stockist): Stockist {
        return repository.update(entity) as Stockist
    }
}