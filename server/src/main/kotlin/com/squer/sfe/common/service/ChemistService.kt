package com.squer.sfe.common.service

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Chemist
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.controller.dto.AddressDTO
import com.squer.sfe.common.controller.dto.ChemistDTO
import com.squer.sfe.common.controller.dto.ContactDTO
import com.squer.sfe.common.controller.dto.DoctorDTO
import com.squer.sfe.common.entity.Address
import com.squer.sfe.common.entity.Contact
import com.squer.sfe.common.entity.Doctor
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ChemistService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): Chemist {
        val searchCriteria = SearchCriteria(CommonQueryName.CHMST_SELECT.query)
        searchCriteria.addCondition("chmst_id", id)
        var chemist = repository.find(searchCriteria).filterIsInstance<Chemist>().first()
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("chemistId",chemist.id!!.id)
        valueMap.put("locationId",chemist.location!!.id)
        var mapList = getDoctorChemist(valueMap)
        var nsIdList = mutableListOf<NamedSquerId>()
        mapList.forEach {
            nsIdList.add(NamedSquerId(it["doctr_id"].toString(),it["doctr_name"].toString()))
        }
        chemist.doctors = nsIdList
        return chemist
    }

    fun create(entity: Chemist): Chemist {
        return repository.create(entity) as Chemist
    }

    fun update(entity: Chemist): Chemist {
        return repository.update(entity) as Chemist
    }

    fun getDoctorChemist(valueMap: Map<String,Any>): List<Map<String,String>> {
        val searchCriteria = SearchCriteria(CommonQueryName.DOCTOR_FOR_CHEMIST_SELECT.query)
        valueMap.forEach {
            searchCriteria.addCondition(it.key, it.value)
        }
        return repository.find(searchCriteria).filterIsInstance<Map<String,String>>()
    }

    fun getChemistForHierarchy(locationId: String): List<ChemistDTO>{
        //get all chemist doctor
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("locationId",locationId)
        var mapList = getDoctorChemist(valueMap)
        var chemistDoctorMap = mutableMapOf<String,MutableList<NamedSquerId>>()
        mapList.forEach {
            if(chemistDoctorMap.containsKey(it["chmst_id"].toString())){
                var list = chemistDoctorMap.get(it["chmst_id"].toString())
                list!!.add(NamedSquerId(it["doctr_id"].toString(), it["doctr_name"].toString()))
            }else {
                var list = mutableListOf<NamedSquerId>()
                list!!.add(NamedSquerId(it["doctr_id"].toString(), it["doctr_name"].toString()))
                chemistDoctorMap.put(it["chmst_id"].toString(),list)
            }
        }

        var searchCriteriaAddress = SearchCriteria(CommonQueryName.CHEMIST_CONTACT_FOR_HIERARCHY_SELECT.query)
        searchCriteriaAddress.addCondition("locationId", locationId)
        var addressList = repository.find(searchCriteriaAddress).filterIsInstance<Address>()
        var addressMap = mutableMapOf<String, MutableList<Address>>()
        addressList.forEach {
            if (addressMap.containsKey(it.owner!!.id)) {
                var list = addressMap.get(it.owner!!.id)
                list!!.add(it)
            } else {
                var list = mutableListOf<Address>()
                list.add(it)
                addressMap.put(it.owner!!.id, list)
            }
        }

        var searchCriteriaContact = SearchCriteria(CommonQueryName.CHEMIST_CONTACT_FOR_HIERARCHY_SELECT.query)
        searchCriteriaContact.addCondition("locationId", locationId)
        var contactList = repository.find(searchCriteriaContact).filterIsInstance<Contact>()
        var contactMap = mutableMapOf<String, MutableList<Contact>>()
        contactList.forEach {
            if (contactMap.containsKey(it.owner!!.id)) {
                var list = contactMap.get(it.owner!!.id)
                list!!.add(it)
            } else {
                var list = mutableListOf<Contact>()
                list.add(it)
                contactMap.put(it.owner!!.id, list)
            }
        }

        val searchCriteria = SearchCriteria(CommonQueryName.CHEMIST_FOR_HIERARCHY_SELECT.query)
        searchCriteria.addCondition("locationId", locationId)
        var chemistList =  repository.find(searchCriteria).filterIsInstance<Chemist>()
        var dtoList = mutableListOf<ChemistDTO>()
        chemistList.forEach{
            var doctorList = mutableListOf<NamedSquerId>()
            if(chemistDoctorMap.containsKey(it.id!!.id)){
                doctorList = chemistDoctorMap[it.id!!.id]!!
            }
            var contactList = mutableListOf<ContactDTO>()
            if (contactMap.containsKey(it.id!!.id)) {
                it.contactDetails = contactMap.get(it.id!!.id)
            }
            var addressList = mutableListOf<AddressDTO>()
            if (addressMap.containsKey(it.id!!.id)) {
                it.addressList = addressMap.get(it.id!!.id)
            }
            dtoList.add(
                ChemistDTO(
                    it.personCode,
                    NamedSquerId(it.id!!.id, it.name),
                    it.location,
                    it.beat,
                    doctorList,
                    contactList,
                    addressList
                )
            )
        }
        return dtoList
    }

    fun getChemistForPharma(locationId: String): List<DoctorDTO>{
        var chemistDTOList = getChemistForHierarchy(locationId)
        var dtoList= mutableListOf<DoctorDTO>()
        chemistDTOList.forEach {
            dtoList.add(
                DoctorDTO(
                    it.personCode,it.chemist,
                    NamedSquerId("syslv00000000000000000000000000000051",""),
                    NamedSquerId("syslv00000000000000000000000000000129",""),
                    it.beat,it.location, mutableListOf<NamedSquerId>(),
                    NamedSquerId("",""),
                    it.contactList,it.addressList
                )
            )
        }
        return dtoList
    }
}