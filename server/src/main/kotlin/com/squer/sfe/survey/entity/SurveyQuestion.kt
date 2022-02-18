package com.squer.sfe.survey.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "srque", tableName = "SRY_SURVEY_QUESTIONS")
class SurveyQuestion: AbstractAuditableEntity() {
    var category: SquerId? = null
    var questionText: String? = null
    var displayOrder: Int? = null
    var isActive: Boolean? = null
    var maxScore: Int? = null
    var answerType: NamedSquerId? = null //text, single, multiple

}