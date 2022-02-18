package com.squer.sfe.common.service

import com.squer.platform.business.entity.NamedSquerId
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Doctor
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.controller.AddressController
import com.squer.sfe.common.controller.ContactController
import com.squer.sfe.common.controller.dto.AddressDTO
import com.squer.sfe.common.controller.dto.ContactDTO
import com.squer.sfe.common.controller.dto.DoctorDTO
import com.squer.sfe.common.entity.Address
import com.squer.sfe.common.entity.Contact
import com.squer.sfe.common.entity.DoctorCoordinates
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class DoctorService {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var contactController: ContactController

    @Autowired
    lateinit var addressController: AddressController

    @Autowired
    lateinit var doctorPotentialService: DoctorPotentialService

    fun findById(id: String): Doctor {
        val searchCriteria = SearchCriteria(CommonQueryName.DOCTR_SELECT.query)
        searchCriteria.addCondition("doctr_id", id)
        var doctor = repository.find(searchCriteria).filterIsInstance<Doctor>().first()
        doctor.contactDetails = contactController.getContactByOwner(id)
        doctor.addressList = addressController.getAddressByOwner(id)
        return doctor
    }

    fun create(entity: Doctor): Doctor {
        return repository.create(entity) as Doctor
    }

    fun update(entity: Doctor): Doctor {
        return repository.update(entity) as Doctor
    }

    fun findByParams(valueMap: Map<String,String>): List<Doctor> {
        val searchCriteria = SearchCriteria(CommonQueryName.DOCTR_SELECT.query)
        valueMap.forEach{
            searchCriteria.addCondition(it.key, it.value)
        }
        return repository.find(searchCriteria).filterIsInstance<Doctor>()
    }

    fun getDoctorForHierarchy(locationId: String): List<DoctorDTO>{
        var searchCriteriaAddress = SearchCriteria(CommonQueryName.DOCTOR_CONTACT_FOR_HIERARCHY_SELECT.query)
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

        var searchCriteriaContact = SearchCriteria(CommonQueryName.DOCTOR_CONTACT_FOR_HIERARCHY_SELECT.query)
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

        val searchCriteria = SearchCriteria(CommonQueryName.DOCTOR_FOR_HIERARCHY_SELECT.query)
        searchCriteria.addCondition("locationId", locationId)
        var doctorList = repository.find(searchCriteria).filterIsInstance<Doctor>()
        doctorList.forEach {
            if (contactMap.containsKey(it.id!!.id)) {
                it.contactDetails = contactMap.get(it.id!!.id)
            } else {
                it.contactDetails = mutableListOf<Contact>()
            }
            if (addressMap.containsKey(it.id!!.id)) {
                it.addressList = addressMap.get(it.id!!.id)
            } else {
                it.addressList = mutableListOf<Address>()
            }
        }

        return getDoctorDTOList(doctorList)
    }

    fun getDoctorDTOList(doctorList: List<Doctor>): List<DoctorDTO>{
        var doctorDtoList= mutableListOf<DoctorDTO>()
        doctorList.forEach{
            doctorDtoList.add(
                DoctorDTO(
                    it.personCode,
                    NamedSquerId(it.id!!.id, it.name),
                    it.speciality,
                    it.classification,
                    it.beat,
                    it.location,
                    getFocusedBrandForDoctor(it.id!!.id),
                    it.reportingMode,
                    getContactDTOList(it.contactDetails!!),
                    getAddressDTOList(it.addressList!!)
                )
            )
        }
        return doctorDtoList
    }

    fun getFocusedBrandForDoctor(doctorId: String): List<NamedSquerId>{
        var brandList = mutableListOf<NamedSquerId>()
        doctorPotentialService.getPotentialByDoctor(doctorId).forEach{
            brandList.add(it.brand!!)
        }
        return brandList
    }

    fun getContactDTOList(contacts: List<Contact>): List<ContactDTO>{
        var contactDTOList = mutableListOf<ContactDTO>()
        contacts.forEach{
            contactDTOList.add(
                ContactDTO(
                    it.type,
                    it.contactDetail
                )
            )
        }
        return contactDTOList
    }

    fun getAddressDTOList(addresses: List<Address>): List<AddressDTO>{
        var addressDTOList = mutableListOf<AddressDTO>()
        addresses.forEach{
            addressDTOList.add(
                AddressDTO(
                    it.buildingName,
                    it.addressLine1,
                    it.addressLine2,
                    it.town,
                    it.state,
                    it.type
                )
            )
        }
        return addressDTOList
    }

    fun saveCoordinates(coordinates: List<DoctorCoordinates>): List<DoctorCoordinates> {
        var saveData = mutableListOf<DoctorCoordinates>()
        coordinates.forEach {
            saveData.add(repository.create(it) as DoctorCoordinates)
        }
        return saveData
    }
}