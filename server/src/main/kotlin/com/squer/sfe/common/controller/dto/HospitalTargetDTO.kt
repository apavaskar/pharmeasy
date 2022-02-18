package com.squer.sfe.common.controller.dto

class HospitalTargetDTO {
    var id: String? = null
    var name: String? = null
    var code: String? = null
    var icuBeds: Int? = null
    var icuPatientCapacity: Int? = null
    var target: Int? = null
    var doctors: MutableList<HospitalDoctor>? = null
}