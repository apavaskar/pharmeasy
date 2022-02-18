package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "hdrcp", tableName = "RPT_HOSPITAL_DAILY_RCPA")
class HospitalDailyRcpa: AbstractAuditableEntity() {
    var hospital: NamedSquerId? = null
    var doctorId: NamedSquerId? = null
    var doctorName: String? = null
    var location: NamedSquerId? = null
    var employee: NamedSquerId? = null
    var yyyyMm: Int? = null
    var yyyyMmDd: Int? = null
    var emrokIvPatients: Int? = null
    var emrokOPatients: Int? = null
    var bothPatients: Int? = null
    var isActive: Boolean? = null
}