package com.squer.sfe.reporting.controller.dto.syncing

import com.squer.sfe.reporting.controller.dto.RcpaDTO

class SyncingRcpaDTO {
    var rcpaId: String? = null
    var attendeeId: String? = null
    var chemistId: String? = null
    var itemId: String? = null
    var doctorId: String? = null
    var rxn: Int? = null
    var quantity: Int? = null
    var value: Double? = null
    var competitionQuantity: Int? = null
    var competitionRxn: Int? = null
    var competitionValue: Double? = null
    var typeId: String? = null
    var externalCode: String? = null
    var actionTaken: Char? = null
}