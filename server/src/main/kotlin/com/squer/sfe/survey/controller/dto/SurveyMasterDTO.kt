package com.squer.sfe.survey.controller.dto

import com.squer.platform.business.entity.NamedSquerId

data class SurveyMasterDTO(
    var title: String? = null,
    var fromDate: Int? = null,
    var toDate: Int? = null,
    var isActive: Boolean? = null,
    var type: NamedSquerId? = null
)