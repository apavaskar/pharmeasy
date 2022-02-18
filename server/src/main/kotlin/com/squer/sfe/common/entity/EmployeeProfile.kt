package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import java.util.*

@EntityMeta(prefix = "emprf", tableName = "CMT_EMPLOYEE_PROFILE")
class EmployeeProfile: AbstractAuditableEntity() {
    var employee: NamedSquerId? = null
    var location: NamedSquerId? = null
    var jobRole: NamedSquerId? = null
    var manager: NamedSquerId? = null
    var fromDate: Date? = null
    var toDate: Date? = null
    var isActive: Boolean? = null
    var isDefault: Boolean? = null
}