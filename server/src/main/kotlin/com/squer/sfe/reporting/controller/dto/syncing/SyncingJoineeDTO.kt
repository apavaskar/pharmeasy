package com.squer.sfe.reporting.controller.dto.syncing

import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

class SyncingJoineeDTO {
    var attendeeId: String? = null
    var joineeId: String? = null
    var managerId: String? = null
    var externalCode: String? = null
    var actionTaken: Char? = null
}