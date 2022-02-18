package com.squer.sfe.survey.controller.dto

class TeamEBListDTO {
    var locationName: String? = null
    var employeeName: String? = null
    var jobName: String? = null
    var surveyResponseId: String? = null
}

data class EbDetailsDTO (
    var survey: SurveyDetailsDTO? = null,
    var answers: Map<String,String>?= null
)