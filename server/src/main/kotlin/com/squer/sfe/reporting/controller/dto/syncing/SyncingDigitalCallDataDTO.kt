package com.squer.sfe.reporting.controller.dto.syncing

import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

class SyncingDigitalCallDataDTO {
    var digitalVisitId: String? = null
    var attendeeId: String? = null
    var visitModeId: String? = null
    var templateId: String? = null
    var duration: Double? = null
    var startTime: Long? = null
    var isActive: Boolean? = null
    var externalCode: String? = null
    var actionTaken: Char? = null
}