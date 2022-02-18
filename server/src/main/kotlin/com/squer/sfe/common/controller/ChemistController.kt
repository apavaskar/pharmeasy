package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.Chemist
import com.squer.sfe.common.service.ChemistService
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.controller.dto.ChemistDTO
import com.squer.sfe.common.controller.dto.ChemistDoctorDTO
import com.squer.sfe.common.service.HospitalService
import com.squer.sfe.common.service.LocationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/chemist")
@RestController
class ChemistController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: ChemistService

    @Autowired
    lateinit var locationService: LocationService

    @Autowired
    lateinit var hospitalService: HospitalService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Chemist {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: Chemist): Chemist {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Chemist): Chemist {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-location/{locationId}")
    fun getByLocation(@PathVariable locationId: String): List<ChemistDTO>{
        var location = locationService.findById(locationId);
        if(location.division!!.id == "divsn00000000000000000000000000000007"){
            return hospitalService.getHospitalForHierarchy(locationId)
        }else{
            return entityService.getChemistForHierarchy(locationId)
        }
     }

    @Throws(SquerException::class)
    @PostMapping("/add-doctor-chemist")
    fun addDoctorChemist(@RequestBody entries: List<ChemistDoctorDTO>): Boolean{
        try {
            entries.forEach {
                var valueMap = mutableMapOf<String, Any>()
                valueMap["doctorId"] = it.doctorId!!
                valueMap["chemistId"] = it.chemistId!!
                repository.fireAdhoc(CommonQueryName.DOCTOR_CHEMIST_INSERT.query, valueMap)
            }
            return true
        }catch (e: Exception){
            e.printStackTrace()
            throw e
        }
    }

    @Throws(SquerException::class)
    @DeleteMapping("/delete-doctor-chemist")
    fun deleteDoctorChemist(@RequestBody entries: List<ChemistDoctorDTO>): Boolean{
        try {
            entries.forEach {
                var valueMap = mutableMapOf<String, Any>()
                valueMap["doctorId"] = it.doctorId!!
                valueMap["chemistId"] = it.chemistId!!
                repository.fireAdhoc(CommonQueryName.DOCTOR_CHEMIST_DELETE.query, valueMap)
            }
            return true
        }catch (e: Exception){
            e.printStackTrace()
            throw e
        }
    }
}