package com.squer.sfe.reporting.controller

import com.squer.platform.persistence.SearchCriteria
import com.squer.sfe.reporting.entity.HospitalDailyRcpa
import com.squer.sfe.reporting.service.HospitalDailyRcpaService
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.service.LocationService
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.controller.dto.HospitalDailyRcpaDTO
import com.squer.sfe.reporting.controller.dto.LocationHospitalVisitDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/hospitaldailyrcpa")
@RestController
class HospitalDailyRcpaController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: HospitalDailyRcpaService

    @Autowired
    lateinit var locationService: LocationService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): HospitalDailyRcpa {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: HospitalDailyRcpa): HospitalDailyRcpa {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: HospitalDailyRcpa): HospitalDailyRcpa {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-location-month/{locationId}/{yyyyMM}")
    fun getForLocationMonth(@PathVariable locationId: String,
                            @PathVariable yyyyMM: Int,
                            @RequestParam(defaultValue = "0") hospitalId: String): List<HospitalDailyRcpaDTO> {
        var valueMap = mutableMapOf<String, Any>()
        valueMap.put("hdrcp_location_id", locationId)
        valueMap.put("hdrcp_yyyy_mm",yyyyMM)
        valueMap.put("hdrcp_is_active", true)
        if(hospitalId!="0")
            valueMap.put("hdrcp_hospital_id", hospitalId)

        var rcpaList = entityService.findByParams(valueMap)
        var dtoList = mutableListOf<HospitalDailyRcpaDTO>()
        rcpaList.forEach {
            dtoList.add(
                HospitalDailyRcpaDTO(
                    it.id!!.id,
                    it.hospital!!.id,
                    it.hospital!!.name,
                    it.doctorId?.id,
                    it.doctorName,
                    it.yyyyMmDd,
                    it.emrokIvPatients,
                    it.emrokOPatients,
                    it.bothPatients
                )
            )
        }
        return dtoList
    }

    @Throws(SquerException::class)
    @GetMapping("/dashboard/{locationId}/{yyyyMM}")
    fun getDashboard(@PathVariable locationId: String, @PathVariable yyyyMM: Int): LocationHospitalVisitDTO{
        var searchCriteriaTarget = SearchCriteria(CommonQueryName.HOSPITAL_TARGET_FOR_MANAGER.query)
        searchCriteriaTarget.addCondition("locationId",locationId)
        searchCriteriaTarget.addCondition("yyyyMM",yyyyMM)
        var targetMapList = repository.find(searchCriteriaTarget).filterIsInstance<Map<String,Any>>()

        var searchCriteriaRcpa = SearchCriteria(ReportingQueryName.HOSPITAL_DAILY_RCPA_FOR_MANAGER_SELECT.query)
        searchCriteriaRcpa.addCondition("locationId",locationId)
        searchCriteriaRcpa.addCondition("yyyyMM",yyyyMM)
        var rcpaMapList = repository.find(searchCriteriaRcpa).filterIsInstance<Map<String,Any>>()

        var location = locationService.findById(locationId)

        var dto = LocationHospitalVisitDTO()
        dto.locationId = location.id!!.id
        dto.location = location.name
        dto.locationTypeId = location.type!!.id

        targetMapList.forEach {
            dto.hospitalCount = (it["hospital_count"] as Long?)!!.toInt()
            dto.icuBeds = (it["icu_beds"] as Long?)!!.toInt()
        }

        rcpaMapList.forEach {
            dto.hospitalVisited = (it["hospital_count"] as Long?)!!.toInt()
            dto.emrokIvPatients = (it["emrok_iv"] as Long?)!!.toInt()
            dto.emrokOPatients = (it["emrok_o"] as Long?)!!.toInt()
            dto.boathPatients = (it["both_pat"] as Long?)!!.toInt()
        }
        return dto
    }

    @Throws(SquerException::class)
    @GetMapping("/dashboard-for-hierarchy/{locationId}/{yyyyMM}")
    fun getDashboardForHierarchy(@PathVariable locationId: String, @PathVariable yyyyMM: Int): List<LocationHospitalVisitDTO>{
        var dtoList = mutableListOf<LocationHospitalVisitDTO>()
        var location = locationService.findById(locationId)

        var searchCriteriaHospital = SearchCriteria(CommonQueryName.HOSPITAL_FOR_HIERARCHY_SELECT.query)
        searchCriteriaHospital.addCondition("locationId",locationId)
        searchCriteriaHospital.addCondition("yyyyMM",yyyyMM)
        if(location.type!!.name == "Zone" ||
            location.type!!.name == "Region" ||
            location.type!!.name == "Territory"){
            searchCriteriaHospital.addCondition(location.type!!.name!!, true)
        }else {
            searchCriteriaHospital.addCondition("all",true)
        }
        var hospitalMapList = repository.find(searchCriteriaHospital).filterIsInstance<Map<String,Any>>()

        var searchCriteriaRcpa =SearchCriteria(ReportingQueryName.HOSPITAL_DAILY_RCPA_FOR_HIERARCHY_SELECT.query)
        searchCriteriaRcpa.addCondition("locationId",locationId)
        searchCriteriaRcpa.addCondition("yyyyMM",yyyyMM)
        if(location.type!!.name == "Zone" ||
            location.type!!.name == "Region" ||
            location.type!!.name == "Territory"){
            searchCriteriaRcpa.addCondition(location.type!!.name!!, true)
        }else {
            searchCriteriaRcpa.addCondition("all",true)
        }
        var hospitalRcpaMapList = repository.find(searchCriteriaRcpa).filterIsInstance<Map<String,Any>>()

        var rcpaMap = mutableMapOf<String,Map<String,Any>>()
        hospitalRcpaMapList.forEach {
            rcpaMap.put(it["location_id"].toString(),it)
        }

        hospitalMapList.forEach {
            var dto = LocationHospitalVisitDTO()
            dto.locationId = it["location_id"].toString()
            dto.location = it["location_name"].toString()
            dto.locationTypeId = it["locat_type_id"].toString()
            dto.employee = if(it["emply_name"]!=null) it["emply_name"].toString() else null
            dto.hospitalCount = (it["hospital_count"] as Long).toInt()
            dto.icuBeds = (it["icu_beds"] as Long).toInt()
            if(rcpaMap.containsKey(it["location_id"].toString())) {
                var map = rcpaMap[it["location_id"].toString()]
                dto.hospitalVisited = (map?.get("visit_count") as Long).toInt()
                dto.emrokIvPatients = (map?.get("emrok_iv_patients") as Long).toInt()
                dto.emrokOPatients = (map?.get("emrok_opatients") as Long).toInt()
                dto.boathPatients = (map?.get("both_patients") as Long).toInt()
            }else{
                dto.hospitalVisited = 0
                dto.emrokIvPatients = 0
                dto.emrokOPatients = 0
                dto.boathPatients = 0
            }
            dtoList.add(dto)
        }
        return dtoList
    }

    @Throws(SquerException::class)
    @GetMapping("/visit-report/{locationId}/{yyyyMM}")
    fun getLocationHospitalVisitReport(@PathVariable locationId: String,
                            @PathVariable yyyyMM: Int): List<LocationHospitalVisitDTO>{
        var searchCriteriaHospitals = SearchCriteria(ReportingQueryName.LOCATION_HOSPITAL_COUNT_SELECT.query)
        searchCriteriaHospitals.addCondition("locationId",locationId)
        var hospitalList = repository.find(searchCriteriaHospitals).filterIsInstance<LocationHospitalVisitDTO>()

        var searchCriteriaVisits = SearchCriteria(ReportingQueryName.DAILY_HOSPITAL_RCAP_VISIT_COUNT_SELECT.query)
        searchCriteriaVisits.addCondition("locationId",locationId)
        searchCriteriaVisits.addCondition("yyyyMM", yyyyMM)
        var visitMapList = repository.find(searchCriteriaVisits).filterIsInstance<Map<String,Any>>()
        var visitCountMap = mutableMapOf<String, Int>()
        visitMapList.forEach {
                visitCountMap[it["location_id"].toString()] = (it["count"] as Long).toInt()
        }

        hospitalList.forEach {
            if(visitCountMap.containsKey(it.locationId)){
                it.hospitalVisited = visitCountMap.get(it.locationId)
            }
        }
        return hospitalList
    }
}