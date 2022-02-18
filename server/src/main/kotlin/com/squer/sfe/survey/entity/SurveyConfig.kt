package com.squer.sfe.survey.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "srcfg", tableName = "SRY_SURVEY_CONFIG")
class SurveyConfig: AbstractAuditableEntity() {
    var survey: SquerId? = null
    var publisherQuery: String? = null
    var consumerQuery: String? = null
}