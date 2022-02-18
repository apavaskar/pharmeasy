package com.squer.sfe.reporting.controller.dto

data class HospitalRcpaDTO (
    var entityId: String? = null,
    var hospitalId: String? = null,
    var hospitalName: String? = null,
    var target: Int? = null,
    var rcpaDate: Int? = null,
    var icuPatients: Int? = null,
    var emrokPatients: Int? = null,
    var teicoplaninPatients: Int? = null,
    var status: String? = null
)
