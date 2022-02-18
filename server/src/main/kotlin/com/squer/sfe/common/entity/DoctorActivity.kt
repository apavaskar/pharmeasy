package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "docat", tableName = "CMT_DOCTOR_ACTIVITY_MASTER")
class DoctorActivity: AbstractStandardEntity()  {
    var divisionId: NamedSquerId? = null
    var isActive: Boolean? = null
}