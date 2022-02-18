package com.squer.sfe.survey.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "srans", tableName = "SRY_SURVEY_ANSWERS")
class SurveyAnswers: AbstractAuditableEntity() {
    var question: SquerId? = null
    var answerText: String? = null
    var displayOrder: Int? = null
    var isActive: Boolean? = null
    var score: Int? = null
}