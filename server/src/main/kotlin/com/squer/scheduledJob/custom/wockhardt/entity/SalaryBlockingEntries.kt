package com.squer.scheduledJob.custom.wockhardt.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "slblk", tableName = "CST_WOCKHARDT_SALARY_BLOCKING")
class SalaryBlockingEntries: AbstractAuditableEntity() {
    var jobDate: Int? = null
    var employee: NamedSquerId? = null
    var location: NamedSquerId? = null
    var jobRole: NamedSquerId? = null
    var missedFromDate: Int? = null
    var missedToDate: Int? = null
    var missedDays: Int? = null
    var leavesFromDate: Int? = null
    var leavesToDate: Int? = null
    var salaryStatus: NamedSquerId? = null
    var reportingStatus: String? = null
}