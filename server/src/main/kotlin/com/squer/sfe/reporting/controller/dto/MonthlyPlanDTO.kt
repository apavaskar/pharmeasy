package com.squer.sfe.reporting.controller.dto

import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import java.time.Year
import javax.xml.stream.Location

data class MonthlyPlanDTO (
    var plan: SquerId? = null,
    var status: NamedSquerId? = null,
    var employee: NamedSquerId? = null,
    var location: NamedSquerId? = null,
    var year: Int? = null,
    var month: Int? = null
)