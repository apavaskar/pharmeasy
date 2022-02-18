package com.squer.sfe.custom.wockhardt.controller

import com.squer.sfe.custom.wockhardt.entity.SFCMaster
import com.squer.sfe.custom.wockhardt.service.WCSFCService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RequestMapping("/custom/wc/sfc")
@RestController
class WCSFCController {

    @Autowired
    lateinit var sfcService: WCSFCService

    @GetMapping("/{location}")
    @Throws
    fun findByLocation(@PathVariable location: String): List<SFCMaster> {
        return sfcService.findByLocation(location)
    }

    @PutMapping("/{id}/{distance}")
    fun updateDistance(@PathVariable id: String, @PathVariable distance: Double) : Boolean {
        return  sfcService.updateDistance(id, distance)
    }

    @PostMapping("/")
    fun createDistance(@RequestBody sfcMaster: SFCMaster): SFCMaster? {
        return sfcService.createDistance(sfcMaster)
    }
}