package com.squer.crm.entity

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.business.entity.SquerId
import java.util.*

@EntityMeta(prefix = "crmcs", tableName = "CRM_CUSTOMER_STAGE")
class CRMDoctorStages: SquerEntity() {
    lateinit var activity: SquerId
    lateinit var doctor: NamedSquerId
    lateinit var product: NamedSquerId
    var stage: NamedSquerId? = null
    lateinit var sumbittedOn: Date
    var current: Boolean = false
    var dropped: Boolean = false
    lateinit var dropOutReason: String
}
