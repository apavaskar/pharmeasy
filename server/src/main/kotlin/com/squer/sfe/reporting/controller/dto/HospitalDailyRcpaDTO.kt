package com.squer.sfe.reporting.controller.dto

data class HospitalDailyRcpaDTO (
    var entityId: String? = null,
    var hospitalId: String? = null,
    var hospitalName: String? = null,
    var doctorId: String? = null,
    var doctorName: String? = null,
    var rcpaDate: Int? = null,
    var emrokIvPatients: Int? = null,
    var emrokOPatients: Int? = null,
    var bothPatients: Int? = null
)