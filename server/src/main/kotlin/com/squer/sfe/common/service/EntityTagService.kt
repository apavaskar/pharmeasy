package com.squer.sfe.common.service

import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.EntityTag
import com.squer.sfe.common.entity.EntityTagRelation
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class EntityTagService {
    @Autowired
    lateinit var repository: SquerRepository

    fun findByParams(valueMap: Map<String,Any>): List<EntityTag> {
        val searchCriteria = SearchCriteria(CommonQueryName.ETAGS_SELECT.query)
        valueMap.forEach {
            searchCriteria.addCondition(it.key, it.value)
        }
        return repository.find(searchCriteria).filterIsInstance<EntityTag>()
    }

    fun findOwnersById(tagId: String): List<EntityTagRelation> {
        var criteria = SearchCriteria(CommonQueryName.ETAGR_SELECT.query)
        criteria.addCondition("etagr_etags_id", tagId)
        return  repository.find(criteria).filterIsInstance<EntityTagRelation>()
    }

}