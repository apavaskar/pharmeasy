package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "hrcpa", tableName = "RPT_HOSPITAL_RCPA")
class HospitalRcpa: AbstractAuditableEntity() {
    var hospital: NamedSquerId? = null
    var location: NamedSquerId? = null
    var employee: NamedSquerId? = null
    var yyyyMm: Int? = null
    var yyyyMmDd: Int? = null
    var icuPatients: Int? = null
    var emrokPatients: Int? = null
    var teicoplaninPatients: Int? = null
    var isActive: Boolean? = null
    var status: NamedSquerId? = null
}