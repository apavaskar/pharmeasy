package com.squer.sfe.common.service

import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Document
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.olap4j.impl.Base64
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.io.File

@Service
class DocumentService {

    @Autowired
    lateinit var repository: SquerRepository

    @Value("\${application.config.uploadpath}")
    lateinit var uploadPath: String

    fun findById(id: String): Document {
        val searchCriteria = SearchCriteria(CommonQueryName.DOCMT_SELECT.query)
        searchCriteria.addCondition("docmt_id", id)
        return repository.find(searchCriteria).filterIsInstance<Document>().first()
    }

    fun create(entity: Document): Document {
        return repository.create(entity) as Document
    }

    fun update(entity: Document): Document {
        return repository.update(entity) as Document
    }

    fun deleteByOwner(ownerId: String): Boolean{
        try{
            var searchCriteria = SearchCriteria(CommonQueryName.DOCMT_SELECT.query)
            searchCriteria.addCondition("docmt_owner_id",ownerId)
            var documents = repository.find(searchCriteria).filterIsInstance<Document>()
            documents.forEach {
                repository.delete(it)
            }
            return true
        }catch (e: Exception){
            throw e
        }
    }

    fun saveDocument(entity: Document, content: String, fileName: String) {
        val filePath = "${uploadPath}/temp/${System.currentTimeMillis()}${fileName}"
        entity.docPath = filePath

        File(filePath).writeBytes(Base64.decode(content.substring(content.indexOf(";base64,") + ";base64,".length)))
        entity.name = fileName
        repository.create(entity)
    }
}