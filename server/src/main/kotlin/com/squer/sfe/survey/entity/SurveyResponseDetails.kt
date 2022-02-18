package com.squer.sfe.survey.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "srvrd", tableName = "SRY_SURVEY_RESPONSE_DETAILS")
class SurveyResponseDetails: AbstractAuditableEntity() {
    var master: SquerId? = null
    var question: SquerId? = null
    var score: Int? = null
}