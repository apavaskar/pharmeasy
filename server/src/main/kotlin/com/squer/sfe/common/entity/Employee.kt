package com.squer.sfe.common.entity

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import java.util.*

@EntityMeta(prefix = "emply", tableName = "CMT_EMPLOYEE_MASTER")
class Employee: Person() {
    var designation: String? = null
    var dateOfJoining: Date? = null
    var dateOfTermination: Date? = null
    var userId: String? = null
    var status: NamedSquerId? = null
    var profiles: List<EmployeeProfile>? = null
}