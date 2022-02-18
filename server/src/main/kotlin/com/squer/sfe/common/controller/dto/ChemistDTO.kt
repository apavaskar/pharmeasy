package com.squer.sfe.common.controller.dto

import com.squer.platform.business.entity.NamedSquerId

data class ChemistDTO (
    var personCode: String? = null,
    var chemist: NamedSquerId? = null,
    var location: NamedSquerId? = null,
    var beat: NamedSquerId? = null,
    var doctorList: List<NamedSquerId>? = null,
    var contactList: List<ContactDTO>? = null,
    var addressList: List<AddressDTO>? = null
)