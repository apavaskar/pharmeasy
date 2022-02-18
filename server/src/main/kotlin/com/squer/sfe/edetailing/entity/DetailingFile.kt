package com.squer.sfe.edetailing.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "dtlfl", tableName = "DTL_DETAILING_FILE")
class DetailingFile: AbstractAuditableEntity() {
    var brand: NamedSquerId? = null
    var htmlFilePath: String? = null
    var thumbnailFilePath: String? = null
    var title: String? = null
    var sequence: Int? = null
    var discription: String? = null
    var isActive: Boolean? = null
    var fromDate: Int? = null
    var toDate: Int? = null
}