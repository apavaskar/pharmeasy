package com.squer.sfe.survey.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "survy", tableName = "SRY_SURVEY_MASTER")
class SurveyMaster: AbstractAuditableEntity() {
    var title: String? = null
    var fromDate: Int? = null
    var toDate: Int? = null
    var isActive: Boolean? = null
    var type: NamedSquerId? = null
}