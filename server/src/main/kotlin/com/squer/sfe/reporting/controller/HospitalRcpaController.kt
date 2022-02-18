package com.squer.sfe.reporting.controller

import com.squer.platform.persistence.SearchCriteria
import com.squer.sfe.reporting.entity.HospitalRcpa
import com.squer.sfe.reporting.service.HospitalRcpaService
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.service.HospitalService
import com.squer.sfe.common.service.LocationService
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.controller.dto.HospitalApprovalDTO
import com.squer.sfe.reporting.controller.dto.HospitalRcpaDTO
import com.squer.sfe.reporting.controller.dto.HospitalRcpaDashboardDTO
import com.squer.sfe.reporting.controller.enum.HospitalRcpaStatusEnum
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/hospitalrcpa")
@RestController
class HospitalRcpaController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: HospitalRcpaService

    @Autowired
    lateinit var hospitalService: HospitalService

    @Autowired
    lateinit var locationService: LocationService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): HospitalRcpa {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: HospitalRcpa): HospitalRcpa {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: HospitalRcpa): HospitalRcpa {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-location-date/{locationId}/{yyyyMMdd}")
    fun getForLocationDate(@PathVariable locationId: String,
                        @PathVariable yyyyMMdd: Int,
                        @RequestParam(defaultValue = "0") hospitalId: String): List<HospitalRcpaDTO> {
        var valueMap = mutableMapOf<String, Any>()
        valueMap.put("hrcpa_location_id", locationId)
        valueMap.put("hrcpa_yyyy_mm_dd",yyyyMMdd)
        valueMap.put("hrcpa_is_active", true)
        if(hospitalId!="0")
            valueMap.put("hrcpa_hospital_id", hospitalId)

        var targets = hospitalService.getHospitalTarget(locationId, yyyyMMdd.toString().substring(0,6).toInt())
        var targetMap = mutableMapOf<String, Int>()
        targets.forEach {
            targetMap.put(it.id!!, it.target!!)
        }


        var rcpaList = entityService.findByParams(valueMap)
        var dtoList = mutableListOf<HospitalRcpaDTO>()
        rcpaList.forEach {
            dtoList.add(
                HospitalRcpaDTO(
                    it.id!!.id,
                    it.hospital!!.id,
                    it.hospital!!.name,
                    targetMap.get(it.hospital!!.id),
                    it.yyyyMmDd,
                    it.icuPatients,
                    it.emrokPatients,
                    it.teicoplaninPatients,
                    it.status!!.name
                )
            )
        }
        return dtoList
    }

    @Throws(SquerException::class)
    @GetMapping("/by-location-month/{locationId}/{yyyyMM}")
    fun getForLocationMonth(@PathVariable locationId: String,
                        @PathVariable yyyyMM: Int,
                        @RequestParam(defaultValue = "0") hospitalId: String): List<HospitalRcpaDTO> {
        var valueMap = mutableMapOf<String, Any>()
        valueMap.put("hrcpa_location_id", locationId)
        valueMap.put("hrcpa_yyyy_mm",yyyyMM)
        valueMap.put("hrcpa_is_active", true)
        if(hospitalId!="0")
            valueMap.put("hrcpa_hospital_id", hospitalId)

        var rcpaList = entityService.findByParams(valueMap)

        //targets
        var targets = hospitalService.getHospitalTarget(locationId,yyyyMM)
        var targetMap = mutableMapOf<String, Int>()
        targets.forEach {
            targetMap.put(it.id!!, it.target!!)
        }

        var dtoList = mutableListOf<HospitalRcpaDTO>()
        rcpaList.forEach {
            dtoList.add(
                HospitalRcpaDTO(
                    it.id!!.id,
                    it.hospital!!.id,
                    it.hospital!!.name,
                    targetMap.get(it.hospital!!.id),
                    it.yyyyMmDd,
                    it.icuPatients,
                    it.emrokPatients,
                    it.teicoplaninPatients,
                    it.status!!.name
                )
            )
        }
        return dtoList
    }

    @Throws(SquerException::class)
    @GetMapping("/approval-list/{locationId}")
    fun getApprovalList(@PathVariable locationId: String): List<HospitalApprovalDTO>{
        var searchCriteria = SearchCriteria(ReportingQueryName.HOSPITAL_STATUS_SELECT.query)
        searchCriteria.addCondition("locationId",locationId)
        searchCriteria.addCondition("statusId", HospitalRcpaStatusEnum.SUBMITTED.status.id)
        return repository.find(searchCriteria).filterIsInstance<HospitalApprovalDTO>()
    }

    @Throws(SquerException::class)
    @GetMapping("/approve/{entityId}")
    fun approveRcpa(@PathVariable entityId: String): Boolean{
        try {
            var hospitalRcpa = entityService.findById(entityId);
            hospitalRcpa.status = HospitalRcpaStatusEnum.APPROVED.status
            entityService.update(hospitalRcpa)
            return true
        }catch (e: Exception){
            throw e
        }
    }

    @Throws(SquerException::class)
    @GetMapping("/reject/{entityId}")
    fun rejectRcpa(@PathVariable entityId: String): Boolean{
        try {
            var hospitalRcpa = entityService.findById(entityId);
            hospitalRcpa.status = HospitalRcpaStatusEnum.REJECTED.status
            entityService.update(hospitalRcpa)
            return true
        }catch (e: Exception){
            throw e
        }
    }

    @Throws(SquerException::class)
    @GetMapping("/dashboard/{locationId}/{yyyyMM}")
    fun getDashboard(@PathVariable locationId: String,
                     @PathVariable yyyyMM: Int ): HospitalRcpaDashboardDTO{
        var dtoList =  mutableListOf<HospitalRcpaDashboardDTO>()
        var searchCriteriaTarget = SearchCriteria(CommonQueryName.HOSPITAL_TARGET_FOR_MANAGER.query)
        searchCriteriaTarget.addCondition("locationId",locationId)
        searchCriteriaTarget.addCondition("yyyyMM",yyyyMM)
        var targetMapList = repository.find(searchCriteriaTarget).filterIsInstance<Map<String,Any>>()

        var searchCriteriaSelf = SearchCriteria(ReportingQueryName.HOSPITAL_RCPA_DASHBOARD_SELF_SELECT.query)
        searchCriteriaSelf.addCondition("locationId", locationId)
        searchCriteriaSelf.addCondition("yyyyMM", yyyyMM)
        var mapList = repository.find(searchCriteriaSelf).filterIsInstance<Map<String,Any>>()
        var location = locationService.findById(locationId)

        var dashboardDto = HospitalRcpaDashboardDTO()
        dashboardDto.locationId = location.id!!.id
        dashboardDto.location = location.name
        dashboardDto.locationTypeId = location.type!!.id

        targetMapList.forEach {
            dashboardDto.totalTarget = (it["target"] as Long?)!!.toInt()
            dashboardDto.hospitalCount = (it["hospital_count"] as Long?)!!.toInt()
            dashboardDto.totalIcuBeds = (it["icu_beds"] as Long?)!!.toInt()
        }
        mapList.forEach {
            dashboardDto.totalIcuPatients = (it["icu_patients"] as Long?)!!.toInt()
            dashboardDto.totalEmrokPatients = (it["emrok_patients"] as Long?)!!.toInt()
            dashboardDto.totalTeicoplaninPatients = (it["tei_patients"] as Long?)!!.toInt()
            dashboardDto.patientSharedTargeted = if(dashboardDto.totalIcuPatients!!>0) ((dashboardDto.totalTarget!! /dashboardDto.totalIcuPatients!!)*100).toDouble() else 0.0
            dashboardDto.patientShareForEmrok = if(dashboardDto.totalIcuPatients!!>0) ((dashboardDto.totalEmrokPatients!!/dashboardDto.totalIcuPatients!!)*100).toDouble() else 0.0
        }
        return dashboardDto
    }

    @Throws(SquerException::class)
    @GetMapping("/dashboard-for-hierarchy/{locationId}/{yyyyMM}")
    fun getHierarchyDashboard(@PathVariable locationId: String,
                     @PathVariable yyyyMM: Int ): List<HospitalRcpaDashboardDTO> {
        var dtoList = mutableListOf<HospitalRcpaDashboardDTO>()
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

        var searchCriteriaRcpa =SearchCriteria(ReportingQueryName.HOSPITAL_RCPA_FOR_HIERARCHY_SELECT.query)
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
            var dto = HospitalRcpaDashboardDTO()
            dto.locationId = it["location_id"].toString()
            dto.location = it["location_name"].toString()
            dto.locationTypeId = it["locat_type_id"].toString()
            dto.employee = if(it["emply_name"]!=null) it["emply_name"].toString() else null
            dto.totalTarget = (it["target"] as Long).toInt()
            dto.hospitalCount = (it["hospital_count"] as Long).toInt()
            dto.totalIcuBeds = (it["icu_beds"] as Long).toInt()
            if(rcpaMap.containsKey(it["location_id"].toString())) {
                var map = rcpaMap[it["location_id"].toString()]
                dto.totalIcuPatients = (map?.get("icu_patients") as Long).toInt()
                dto.totalEmrokPatients = (map?.get("emrok_patients") as Long).toInt()
                dto.totalTeicoplaninPatients = (map?.get("tei_patients") as Long).toInt()
                dto.patientSharedTargeted = ((dto.totalTarget!! /dto.totalIcuPatients!!)*100).toDouble()
                dto.patientShareForEmrok = ((dto.totalEmrokPatients!!/dto.totalIcuPatients!!)*100).toDouble()
            }else {
                dto.totalIcuPatients = 0
                dto.totalEmrokPatients = 0
                dto.totalTeicoplaninPatients = 0
                dto.patientSharedTargeted = 0.0
                dto.patientShareForEmrok = 0.0
            }
            dtoList.add(dto)
        }
        return dtoList
    }
}