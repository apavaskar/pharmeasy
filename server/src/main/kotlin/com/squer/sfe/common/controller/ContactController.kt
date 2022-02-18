package com.squer.sfe.common.controller

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.common.entity.Contact
import com.squer.sfe.common.service.ContactService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/contact")
@RestController
class ContactController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: ContactService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Contact {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: Contact): Contact {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Contact): Contact {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-owner/{ownerId}")
    fun getContactByOwner(@PathVariable ownerId: String): List<Contact> {
        var valueMap = mutableMapOf<String,String>()
        valueMap.put("contc_owner_id",ownerId)
        return entityService.findByParams(valueMap)
    }
}