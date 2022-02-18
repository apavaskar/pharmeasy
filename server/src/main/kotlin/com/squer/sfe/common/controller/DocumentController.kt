package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.Document
import com.squer.sfe.common.service.DocumentService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.controller.dto.DocumentDTO
import org.bson.internal.Base64
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.*
import java.io.File
import kotlin.jvm.Throws

@RequestMapping("/document")
@RestController
class DocumentController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: DocumentService

    @Value("\${application.config.uploadpath}")
    lateinit var uploadPath: String

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Document {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: Document): Document {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Document): Document {
        return entityService.update(entity)
    }

    @GetMapping("/download/{id}")
    fun downloadDocument(@PathVariable id: String): ByteArray {
        val document = repository.restore(SquerId(id)) as Document
        return File(document.docPath).readBytes()
    }

}