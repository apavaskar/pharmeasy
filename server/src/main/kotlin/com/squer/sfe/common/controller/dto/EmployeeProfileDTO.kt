package com.squer.sfe.common.controller.dto

import com.squer.platform.business.entity.NamedSquerId
import java.util.*

data class EmployeeProfileDTO (
    var empCode:String? = null,
    var empDesignation:String? = null,
    var employee: NamedSquerId? = null,
    var location: NamedSquerId? = null,
    var jobTitle: NamedSquerId? = null,
    var division: NamedSquerId? = null,
    var dateOfJoining: Date? = null
)
