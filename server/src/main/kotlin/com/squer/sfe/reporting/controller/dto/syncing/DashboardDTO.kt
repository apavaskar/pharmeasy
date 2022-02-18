package com.squer.sfe.reporting.controller.dto.syncing

data class DashboardDTO(
    var yearMonth: String? = null,
    var totalDoctors: Int? = null,
    var fieldDays: Int? = null,
    var nonCallDays: Int? = null,
    var totalDoctorPlanned: Int? = null,
    var totalPlanedDoctorVisited: Int? = null,
    var totalUnPlanedDoctorVisited: Int? = null,
    var missedCalls: Int? = null,
    var coreDoctorVisited: Int? =null,
    var nonCoreDoctorVisited: Int? = null,
    var superCoreDoctorVisited: Int? = null,
    var totalDigitalCalls: Int? =null,
    var digitalMissCalls: Int? = null,
    var totalPhysicalCalls: Int? = null,
    var physicalMissCalls: Int? = null,
    var jointDays: Int? = null
)