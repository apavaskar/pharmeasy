package com.squer.sfe.common.service

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Hospital
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.controller.dto.AddressDTO
import com.squer.sfe.common.controller.dto.ChemistDTO
import com.squer.sfe.common.controller.dto.ContactDTO
import com.squer.sfe.common.controller.dto.HospitalTargetDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class HospitalService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): Hospital {
        val searchCriteria = SearchCriteria(CommonQueryName.HSPTL_SELECT.query)
        searchCriteria.addCondition("hsptl_id", id)
        return repository.find(searchCriteria).filterIsInstance<Hospital>().first()
    }

    fun create(entity: Hospital): Hospital {
        return repository.create(entity) as Hospital
    }

    fun update(entity: Hospital): Hospital {
        return repository.update(entity) as Hospital
    }

    fun findByParams(valueMap: Map<String,Any>): List<Hospital> {
            val searchCriteria = SearchCriteria(CommonQueryName.HSPTL_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<Hospital>()
        }

    fun getHospitalTarget(locationId: String, yyyyMM: Int):List<HospitalTargetDTO>{
        var searchCriteria = SearchCriteria(CommonQueryName.LOCATION_HOSPITAL_SELECT.query)
        searchCriteria.addCondition("locationId",locationId)
        searchCriteria.addCondition("yyyyMM",yyyyMM)
        return repository.find(searchCriteria).filterIsInstance<HospitalTargetDTO>()
    }

    fun getDoctorHospital(valueMap: Map<String,Any>): List<Map<String,String>> {
        val searchCriteria = SearchCriteria(CommonQueryName.DOCTOR_FOR_HOSPITAL_SELECT.query)
        valueMap.forEach {
            searchCriteria.addCondition(it.key, it.value)
        }
        return repository.find(searchCriteria).filterIsInstance<Map<String,String>>()
    }

    fun getHospitalForHierarchy(locationId: String): List<ChemistDTO>{
        //get all hospital doctor
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("locationId",locationId)
        var mapList = getDoctorHospital(valueMap)
        var hospitaltDoctorMap = mutableMapOf<String,MutableList<NamedSquerId>>()
        mapList.forEach {
            if(hospitaltDoctorMap.containsKey(it["hsptl_id"].toString())){
                var list = hospitaltDoctorMap.get(it["hsptl_id"].toString())
                list!!.add(NamedSquerId(it["doctr_id"].toString(), it["doctr_name"].toString()))
            }else {
                var list = mutableListOf<NamedSquerId>()
                list!!.add(NamedSquerId(it["doctr_id"].toString(), it["doctr_name"].toString()))
                hospitaltDoctorMap.put(it["hsptl_id"].toString(),list)
            }
        }

        val searchCriteria = SearchCriteria(CommonQueryName.HOSPITAL_MASTER_FOR_HIERARCHY_SELECT.query)
        searchCriteria.addCondition("locationId", locationId)
        var hospitalList =  repository.find(searchCriteria).filterIsInstance<Hospital>()
        var dtoList = mutableListOf<ChemistDTO>()
        hospitalList.forEach{
            var doctorList = mutableListOf<NamedSquerId>()
            if(hospitaltDoctorMap.containsKey(it.id!!.id)){
                doctorList = hospitaltDoctorMap[it.id!!.id]!!
            }
            dtoList.add(
                ChemistDTO(
                    it.code,
                    NamedSquerId(it.id!!.id, it.name),
                    it.location,
                    null,
                    doctorList,
                    mutableListOf<ContactDTO>(),
                    mutableListOf<AddressDTO>()
                )
            )
        }
        return dtoList
    }
}