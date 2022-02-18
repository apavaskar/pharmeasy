package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "docmt", tableName = "CMT_DOCUMENT_MASTER")
class Document: AbstractStandardEntity() {
    var type: NamedSquerId?= null
    var docPath: String? = null
    var owner: SquerId? = null
}