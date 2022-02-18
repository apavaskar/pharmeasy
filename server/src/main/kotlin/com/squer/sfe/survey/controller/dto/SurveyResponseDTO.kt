package com.squer.sfe.survey.controller.dto

data class SurveyResponseDTO (
    var surveyId: String? = null,
    var surveyBy: String? = null,
    var surveyFor: String? = null,
    var surveyDate: Int? = null,
    var responseDetails: List<SurveyResponseDetailsDTO>? = null
)

data class SurveyResponseDetailsDTO(
    var questionId: String? = null,
    var answerTypeId: String? = null,
    var score: Int? = null,
    var answers: List<SurveyResponseAnswersDTO>? = null
)

data class SurveyResponseAnswersDTO(
    var answerId: String? = null,
    var answerText: String? = null
)