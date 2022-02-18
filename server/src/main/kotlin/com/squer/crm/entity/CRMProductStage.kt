package com.squer.crm.entity

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerEntity

@EntityMeta(prefix = "crmps", tableName = "CRM_PRODUCT_STAGE")
class CRMProductStage: SquerEntity() {
    lateinit var product: NamedSquerId
    lateinit var stage: NamedSquerId
    var sequence: Int = 0
    var active: Boolean = false
}