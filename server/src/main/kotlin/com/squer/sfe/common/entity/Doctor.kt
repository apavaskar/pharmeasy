package com.squer.sfe.common.entity

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "doctr", tableName = "CMT_DOCTOR_MASTER")
class Doctor: Person() {
    var uniqueCode: String? = null
    var location: NamedSquerId? = null
    var beat: NamedSquerId? = null
    var speciality: NamedSquerId? = null
    var classification: NamedSquerId? = null
    var status: NamedSquerId? = null
    var reportingMode: NamedSquerId? = null
}