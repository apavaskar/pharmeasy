package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.*
import java.util.*

@EntityMeta(prefix = "dtvat", tableName = "RPT_DAILY_VISIT_ATTENDEE")
class DailyVisitAttendee: AbstractAuditableEntity() {
    var plan: SquerId? = null
    var customer: NamedSquerId? = null
    var activityType: NamedSquerId? = null // call/non call/leave/ marketing
    var activityTypeId: SquerId? = null // if noncall - noncall type id -
    var duration: Double? = null
    var yyyyMm: Int? = null
    var yyyyMmDd: Int? = null
    var location: NamedSquerId? = null
    var employee: NamedSquerId? = null
    var isPlanned: Boolean? = null
    var isReported: Boolean? = null
    var isJoint: Boolean? = null
    var isRcpaDone: Boolean? = null
    var isVideoShown: Boolean? =null
    var visitType: NamedSquerId? = null //physical/digital
    var remarks: String? = null
    var isActive: Boolean? = null
    var joineeReference: SquerId? = null
    var visitRecordedTime: Date? = null
    var longitude: String? = null
    var latitude: String? = null
}