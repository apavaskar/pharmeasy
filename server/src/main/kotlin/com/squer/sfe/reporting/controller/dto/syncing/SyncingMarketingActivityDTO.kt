package com.squer.sfe.reporting.controller.dto.syncing

import com.squer.platform.business.entity.NamedSquerId

class SyncingMarketingActivityDTO {
    var entityId: String? = null
    var activityId: String? = null
    var yyyyMm: Int? = null
    var yyyyMmDd: Int? = null
    var locationId: String? = null
    var employeeID: String? = null
    var duration: Double? = null
    var inClinicActivity: Boolean? = null
    var externalCode: String? = null
    var actionTaken: Char? = null
    var brands: List<String>? = null
    var doctors: List<String>? = null
}