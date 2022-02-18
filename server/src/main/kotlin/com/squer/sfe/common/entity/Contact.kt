package com.squer.sfe.common.entity

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "contc", tableName = "CMT_CONTACT_MASTER")
class Contact : SquerEntity()  {
    var owner: SquerId? = null
    var type: NamedSquerId? = null
    var contactDetail: String? = null
}