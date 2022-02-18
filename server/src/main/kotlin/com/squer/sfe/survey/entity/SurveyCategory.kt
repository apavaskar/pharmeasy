package com.squer.sfe.survey.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "srcat", tableName = "SRY_SURVEY_CATEGORY")
class SurveyCategory: AbstractAuditableEntity() {
    var survey: SquerId? = null
    var title: String? = null
    var displayOrder: Int? = null
    var isActive: Boolean? = null
}