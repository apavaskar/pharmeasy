package com.squer.sfe.reporting.controller.dto

class AttendeeVisitDTO {
    var attendeeId: String? = null
    var isVisited: Boolean? = null
    var isRcapDone: Boolean? = null
    var isVideoShown: Boolean? = null
    var isJoint: Boolean? =null
    var managers: List<String>? = null
    var visitTypeId: String? = null
    var remarks: String? = null
}