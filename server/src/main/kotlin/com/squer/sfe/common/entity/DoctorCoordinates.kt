package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "dcoor", tableName = "CMT_DOCTOR_COORDINATES")
class DoctorCoordinates: AbstractAuditableEntity() {
    lateinit var doctor: SquerId
    var longitude: Double = 0.0
    var latitude: Double = 0.0
    var isPrimary: Boolean = false
    var address: String = ""
}