package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "hsptg", tableName = "RPT_HOSPITAL_PATIENT_TARGET")
class HospitalPatientTarget: AbstractAuditableEntity() {
    var hospital: NamedSquerId? = null
    var yyyyMm: Int? = null
    var month: Int? = null
    var year: Int? = null
    var target: Int? = null
}