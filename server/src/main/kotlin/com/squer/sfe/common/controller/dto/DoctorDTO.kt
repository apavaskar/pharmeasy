package com.squer.sfe.common.controller.dto

import com.squer.platform.business.entity.NamedSquerId

data class DoctorDTO (
    var personCode: String? = null,
    var doctor: NamedSquerId? = null,
    var speciality: NamedSquerId ? = null,
    var classification: NamedSquerId? = null,
    var beat: NamedSquerId? = null,
    var location: NamedSquerId? = null,
    var focusedBrands: List<NamedSquerId>? = null,
    var reportingMode: NamedSquerId? = null,
    var contactList: List<ContactDTO>? = null,
    var addressList: List<AddressDTO>? = null
)