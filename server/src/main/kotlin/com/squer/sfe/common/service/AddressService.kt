package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Address
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.entity.Contact
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class AddressService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): Address {
        val searchCriteria = SearchCriteria(CommonQueryName.ADDRS_SELECT.query)
        searchCriteria.addCondition("addrs_id", id)
        return repository.find(searchCriteria).filterIsInstance<Address>().first()
    }

    fun create(entity: Address): Address {
        return repository.create(entity) as Address
    }

    fun update(entity: Address): Address {
        return repository.update(entity) as Address
    }

    fun findByParams(valueMap: Map<String,String>): List<Address> {
        val searchCriteria = SearchCriteria(CommonQueryName.ADDRS_SELECT.query)
        valueMap.forEach{
            searchCriteria.addCondition(it.key, it.value)
        }
        return repository.find(searchCriteria).filterIsInstance<Address>()
    }
}