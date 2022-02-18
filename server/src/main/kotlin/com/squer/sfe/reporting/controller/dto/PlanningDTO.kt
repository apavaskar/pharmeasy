package com.squer.sfe.reporting.controller.dto

class PlanningDTO {
    var activityId: String? = null
    var yyyyMMdd: Int? = null
    var yyyyMM: Int? = null
    var employeeId: String? = null
    var locationId: String? = null
    var monthlyPlanId: String? = null
    var dailyVisitId: String? = null
    var duration: Double? = null
    var fieldList: List<FieldVisitDTO>? = null
    var nonCallList: List<NonCallActivityDTO>? = null
}