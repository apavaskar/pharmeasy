package com.squer.sfe.common.entity

import com.squer.platform.business.entity.*
import java.awt.datatransfer.ClipboardOwner
import java.util.*

@EntityMeta(prefix = "etags", tableName = "CMT_ENTITY_TAG")
class EntityTag: AbstractStandardEntity() {
    lateinit var objectType: String
    lateinit var tagPurpose: String
    lateinit var  validUpto: Date
    var vadelidUptoYyyyMm: Int  = 0
    var validUptoYyyyMmDd: Int  = 0
}

@EntityMeta(prefix = "etagr", tableName = "CMT_ENTITY_TAG")
class EntityTagRelation: SquerEntity() {
    lateinit var owner: NamedSquerId
    lateinit var tag: NamedSquerId
}