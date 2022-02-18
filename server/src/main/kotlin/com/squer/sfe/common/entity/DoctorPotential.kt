package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "docpu", tableName = "CMT_DOCTOR_POTENTIAL")
class DoctorPotential: AbstractAuditableEntity() {
    var doctor: NamedSquerId? = null
    var brand: NamedSquerId? = null
    var isFocused: Boolean? = null
    var potential: Int? = null
}