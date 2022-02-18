package com.squer.scheduledJob.custom.wockhardt.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import java.util.*

@EntityMeta(prefix = "schjb", tableName = "CST_WOCKHARDT_SCHEDULE_JOB")
class ScheduledJob: AbstractAuditableEntity() {
    var jobType: String? = null
    var startTime: Date? = null
    var endTime: Date? = null
    var status: String? = null
    var errorString: String? = null
}