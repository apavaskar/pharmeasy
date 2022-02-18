package com.squer.sfe.reports.controller.dto

class EffortReportsRow {
    /*
     dtvat_customer_id, dtvat_activity_type_id, dtvat_activity_type_id_id, dtvat_yyyy_mm_dd,
               dtvat_is_planned, dtvat_is_reported, dtvat_is_joint, dtvat_location_id, dtvat_duration,
               doctr_classification_id, loctt_name
     */
    lateinit var customerId: String
    lateinit var activityType: String
    lateinit var activityTypeId: String
    lateinit var locationId: String
    lateinit var locationName: String
    var yyyyMmDd: Int = 0
    var planned: Boolean = false
    var visited: Boolean = false
    var joint: Boolean = false
    var duration: Double = 0.0
    lateinit var classificationId: String
    lateinit var locationTypeName: String
}