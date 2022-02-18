package com.squer.sfe.common.controller.dto

data class HospitalDTO (
    var id: String? = null,
    var name: String? = null,
    var code: String? = null,
    var icuBeds: Int? = null,
    var icuPatientCapacity: Int? = null,
    var doctors: MutableList<HospitalDoctor>? =null
)

class HospitalDoctor{
    var doctorId: String? = null
    var doctorName: String? = null
}
