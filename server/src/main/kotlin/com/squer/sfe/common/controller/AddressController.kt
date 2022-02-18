package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.Address
import com.squer.sfe.common.service.AddressService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.entity.Contact
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/address")
@RestController
class AddressController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: AddressService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Address {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: Address): Address {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Address): Address {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-owner/{ownerId}")
    fun getAddressByOwner(@PathVariable ownerId: String): List<Address> {
        var valueMap = mutableMapOf<String,String>()
        valueMap.put("addrs_owner_id",ownerId)
        return entityService.findByParams(valueMap)
    }
}