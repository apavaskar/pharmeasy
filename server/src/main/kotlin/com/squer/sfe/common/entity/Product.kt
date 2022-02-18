package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "prcdt", tableName = "CMT_PRODUCT_MASTER")
class Product: AbstractStandardEntity() {
    var brand: NamedSquerId? = null
    var isActive: Boolean? = null
    var nsp: Double ? = null
    var nrv: Double ? = null
    var mrp: Double ? = null
    var showInDetailing: Boolean? = null
    var showInRcpa: Boolean? = null
    var rcpaValue: Double? = null
    var rxnUnits: Int? = null
}