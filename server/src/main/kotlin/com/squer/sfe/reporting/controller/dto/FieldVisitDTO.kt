package com.squer.sfe.reporting.controller.dto

import com.squer.platform.business.entity.NamedSquerId

class FieldVisitDTO {
    var customerId: String? = null
    var isPlanned: Boolean? = null
    var isReported: Boolean? = null
    var isJoint: Boolean? = null
    var isRcpaDone: Boolean? = null
    var isVideoShown: Boolean? =null
    var remarks: String? = null
    var visitType: NamedSquerId? = null //physical/digital
}