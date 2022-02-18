package com.squer.sfe.edetailing.service

import com.squer.sfe.edetailing.EdetailingQueryName
import com.squer.sfe.edetailing.entity.DetailingFile
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class DetailingFileService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): DetailingFile {
        val searchCriteria = SearchCriteria(EdetailingQueryName.DTLFL_SELECT.query)
        searchCriteria.addCondition("dtlfl_id", id)
        return repository.find(searchCriteria).filterIsInstance<DetailingFile>().first()
    }

    fun create(entity: DetailingFile): DetailingFile {
        return repository.create(entity) as DetailingFile
    }

    fun update(entity: DetailingFile): DetailingFile {
        return repository.update(entity) as DetailingFile
    }

    fun findByParams(valueMap: Map<String,Any>): List<DetailingFile> {
            val searchCriteria = SearchCriteria(EdetailingQueryName.DTLFL_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<DetailingFile>()
        }
}