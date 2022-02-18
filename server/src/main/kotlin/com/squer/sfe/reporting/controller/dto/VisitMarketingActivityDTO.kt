package com.squer.sfe.reporting.controller.dto

data class VisitMarketingActivityDTO (
    var id: String? = null,
    var attendeeId: String? = null,
    var activityId: String? = null,
    var duration: Double? = null,
    var brandList: List<MarketingActivityBrandDTO>? = null,
    var doctorList: List<MarketingActivityDoctorDTO>? = null,
)