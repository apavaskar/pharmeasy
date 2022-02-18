package com.squer.sfe.common.controller.dto

import com.squer.platform.business.entity.NamedSquerId

data class EmployeeDTO(
    var location: NamedSquerId? = null,
    var employee: NamedSquerId? = null,
    var jobRole: NamedSquerId? = null
)