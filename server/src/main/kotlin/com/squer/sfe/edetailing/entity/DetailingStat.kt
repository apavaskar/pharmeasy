package com.squer.sfe.edetailing.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerId
import org.exolab.castor.types.DateTime
import java.util.*

@EntityMeta(prefix = "dtlst", tableName = "DTL_STAT_DETAILS")
class DetailingStat: AbstractAuditableEntity() {
    var detailMaster: SquerId? = null
    var file: SquerId? = null
    var startTime: Date? = null
    var endTime: Date? = null
    var remarks: String? = null
    var rating: Double? = null
}