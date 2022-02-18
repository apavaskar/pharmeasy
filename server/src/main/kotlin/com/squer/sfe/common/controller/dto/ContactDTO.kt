package com.squer.sfe.common.controller.dto

import com.squer.platform.business.entity.NamedSquerId

data class ContactDTO(
    var type: NamedSquerId? = null,
    var contactDetail: String? = null
)

data class AddressDTO(
    var buildingName: String,
    var addressLine1: String,
    var addressLine2: String,
    var town: NamedSquerId? = null,
    var state: NamedSquerId? = null,
    var type: NamedSquerId? = null
)