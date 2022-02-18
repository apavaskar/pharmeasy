package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Contact
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.entity.SystemLov
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ContactService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): Contact {
        val searchCriteria = SearchCriteria(CommonQueryName.CONTC_SELECT.query)
        searchCriteria.addCondition("contc_id", id)
        return repository.find(searchCriteria).filterIsInstance<Contact>().first()
    }

    fun create(entity: Contact): Contact {
        return repository.create(entity) as Contact
    }

    fun update(entity: Contact): Contact {
        return repository.update(entity) as Contact
    }

    fun findByParams(valueMap: Map<String,String>): List<Contact> {
        val searchCriteria = SearchCriteria(CommonQueryName.CONTC_SELECT.query)
        valueMap.forEach{
            searchCriteria.addCondition(it.key, it.value)
        }
        return repository.find(searchCriteria).filterIsInstance<Contact>()
    }
}