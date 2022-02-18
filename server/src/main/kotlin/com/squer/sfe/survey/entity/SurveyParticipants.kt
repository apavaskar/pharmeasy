package com.squer.sfe.survey.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "srpat", tableName = "SRY_SURVEY_PARTICIPANTS")
class SurveyParticipants: AbstractAuditableEntity() {
    var survey: SquerId? = null
    var publisher: String? = null
    var consumner: String? = null
}