package com.squer.sfe.survey.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "srvrm", tableName = "SRY_SURVEY_RESPONSE_MASTER")
class SurveyResponseMaster: AbstractAuditableEntity() {
    var survey: SquerId? = null
    var surveyBy: NamedSquerId? = null
    var surveyFor: NamedSquerId? = null
    var surveyDate: Int? = null
    var yyyyMm: Int? = null
    var isLatest: Boolean? = null
}