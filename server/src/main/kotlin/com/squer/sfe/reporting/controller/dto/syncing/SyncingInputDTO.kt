package com.squer.sfe.reporting.controller.dto.syncing

import com.squer.platform.business.entity.NamedSquerId

class SyncingInputDTO {
    var visitInputId: String? = null
    var attendeeId: String? = null
    var inputId: String? = null
    var quantity: Int? = null
    var externalCode: String? = null
    var actionTaken: Char? = null
}