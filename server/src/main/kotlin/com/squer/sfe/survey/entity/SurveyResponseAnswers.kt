package com.squer.sfe.survey.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "srvan", tableName = "SRY_SURVEY_RESPONSE_ANSWERS")
class SurveyResponseAnswers: AbstractAuditableEntity() {
    var details: SquerId? = null
    var answerId: String? = null
    var answer: String? = null
}