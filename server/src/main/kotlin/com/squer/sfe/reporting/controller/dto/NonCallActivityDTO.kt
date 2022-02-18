package com.squer.sfe.reporting.controller.dto

import com.squer.platform.business.entity.NamedSquerId

class NonCallActivityDTO {
    var activityTypeId: String? = null
    var isPlanned: Boolean? = null
    var isReported: Boolean? = null
    var duration: Double? = null
    var visitType: NamedSquerId? = null //physical/digital
    var remarks: String? = null
}