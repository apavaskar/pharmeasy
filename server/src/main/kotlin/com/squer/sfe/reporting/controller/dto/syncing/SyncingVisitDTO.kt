package com.squer.sfe.reporting.controller.dto.syncing

import java.util.*

class SyncingVisitDTO {
    var monthlyPlanId: String? = null
    var dailyVisitId: String? = null
    var attendeeId: String? = null
    var customerId: String? = null
    var activityType: String? = null // call/non call//leave
    var activityTypeId: String? = null // if noncall - noncall type id
    var duration: Double? = null
    var yyyyMmDd: Int? = null
    var locationId: String? = null
    var employeeId: String? = null
    var isPlanned: Boolean? = null
    var isReported: Boolean? = null
    var isJoint: Boolean? = null
    var isRcpaDone: Boolean? = null
    var isVideoShown: Boolean? =null
    var visitTypeId: String? = null
    var remarks: String? = null
    var isActive: Boolean? = null
    var externalCode: String? = null
    var joineeList: List<SyncingJoineeDTO>? = null
    var rcpaList: List<SyncingRcpaDTO>? = null
    var detailingList : List<SyncingDetailingDTO>? = null
    var digitalVisitData: List<SyncingDigitalCallDataDTO>? = null
    var inputsList: List<SyncingInputDTO>? = null
    var joineeReferenceId: String? = null
    var joineeMarkStatus: String? = null
    var visitRecordTime: Date? = null
    var coordinates: String? = null
}