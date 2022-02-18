package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.Doctor
import com.squer.sfe.common.service.DoctorService
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.controller.dto.DoctorDTO
import com.squer.sfe.common.entity.DoctorCoordinates
import com.squer.sfe.common.service.ChemistService
import com.squer.sfe.common.service.LocationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.Throws

@RequestMapping("/doctor")
@RestController
class DoctorController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: DoctorService

    @Autowired
    lateinit var locationService: LocationService

    @Autowired
    lateinit var chemistService: ChemistService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Doctor {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: Doctor): Doctor {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Doctor): Doctor {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-beat/{beatId}")
    fun getByBeat(@PathVariable beatId: String): List<DoctorDTO> {
        var valueMap = mutableMapOf<String,String>()
        valueMap.put("doctr_beat_id",beatId)
        return entityService.getDoctorDTOList(entityService.findByParams(valueMap))
    }

    @Throws(SquerException::class)
    @GetMapping("/by-location/{locationId}")
    fun getByLocation(@PathVariable locationId: String): List<DoctorDTO> {
        var location = locationService.findById(locationId);
        if(location.division!!.id == "divsn00000000000000000000000000000016"){
               return chemistService.getChemistForPharma(locationId)
        }else {
            return entityService.getDoctorForHierarchy(locationId)
        }
    }

    @Throws(SquerException::class)
    @PostMapping("/coordinates")
    fun saveCoordinates(@RequestBody doctorCoordinates: List<DoctorCoordinates>): List<DoctorCoordinates> {
        //TODO change to check if it exists
        return entityService.saveCoordinates(doctorCoordinates)
    }
}