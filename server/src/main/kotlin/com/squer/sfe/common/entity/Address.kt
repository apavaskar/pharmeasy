package com.squer.sfe.common.entity

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "addrs", tableName = "CMT_ADDRESS_MASTER")
class Address : SquerEntity() {
    var buildingName: String = ""
    var addressLine1: String = ""
    var addressLine2: String = ""
    var town: NamedSquerId? = null
    var state: NamedSquerId? = null
    var type: NamedSquerId? = null
    var owner: SquerId? = null
}