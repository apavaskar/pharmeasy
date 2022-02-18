package com.squer.sfe.reporting.controller.dto

import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

data class AttendeeDTO (
    var attendeeID: SquerId? = null,
    var plan: SquerId? = null,
    var activityType: NamedSquerId? = null, // call/non call
    var activityTypeId: SquerId? = null, // if noncall - noncall type id
    var customer: NamedSquerId? = null,
    var yyyyMm: Int? = null,
    var yyyyMmDd: Int? = null,
    var location: NamedSquerId? = null,
    var employee: NamedSquerId? = null,
    var isPlanned: Boolean? = null,
    var isReported: Boolean? = null,
    var isJoint: Boolean? = null,
    var isRcpaDone: Boolean? = null,
    var isVideoShown: Boolean? =null,
    var visitType: NamedSquerId? = null,
    var remarks: String? = null,
    var isActive: Boolean? = null,
    var joineeReference: SquerId? = null,
    var rcpaList: List<RcpaDTO>? = null,
    var inputList: List<InputDTO>? = null,
    var pobList: List<PobDTO>? = null,
    var joineeList: List<JoineeDTO>? = null,
    var detailingList: List<DetailingDTO>? = null,
    var digitalVisitList: List<DigitalVisitDTO>? = null
)

data class EmployeeWiseAttendeeDTO(
    var employee: String? = null,
    var attendeeList: List<AttendeeDTO>? = null
)