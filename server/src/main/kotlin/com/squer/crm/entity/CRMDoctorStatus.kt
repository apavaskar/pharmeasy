package com.squer.crm.entity

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerEntity

@EntityMeta(prefix = "crmss", tableName = "CRM_LATEST_STAGE_STATUS")
class CRMDoctorStatus: SquerEntity() {
    lateinit var doctor: NamedSquerId
    lateinit var product: NamedSquerId
    lateinit var stage: NamedSquerId
    var dropped: Boolean = false
}