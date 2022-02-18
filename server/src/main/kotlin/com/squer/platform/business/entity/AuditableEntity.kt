package com.squer.platform.business.entity

import java.util.*

interface AuditableEntity {
    var createdBy: String
    var updatedBy: String
    var createdOn: Date
    var updatedOn: Date
    var staleId: Long
}