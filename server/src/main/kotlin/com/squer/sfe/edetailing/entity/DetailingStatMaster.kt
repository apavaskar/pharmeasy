package com.squer.sfe.edetailing.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import org.exolab.castor.types.DateTime
import java.util.*

@EntityMeta(prefix = "dtlmt", tableName = "DTL_STAT_MASTER")
class DetailingStatMaster: AbstractAuditableEntity() {
    var dailyAttendeeId: SquerId? = null
    var doctor: NamedSquerId? = null
    var brand: NamedSquerId? = null
    var startTime: Date? = null
    var endTime: Date? = null
}