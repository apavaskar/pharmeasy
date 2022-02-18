package com.squer.sfe.survey.controller.dto

data class SurveyDetailsDTO (
    var surveyId: String? = null,
    var surveyTitle: String? = null,
    var categories: List<SurveyCategoriesDTO>? = null
)

data class SurveyCategoriesDTO(
    var categoryTitle: String? = null,
    var categoryDisplayOrder: Int? = null,
    var questions: List<SurveyQuestionDTO>? = null
)

data class SurveyQuestionDTO(
    var questionId: String? = null,
    var answerType: String? = null,
    var questionText: String? = null,
    var questionDisplayOrder: Int? = null,
    var questionMaxScore: Int? = null,
    var answers: List<SurveyAnswerDTO>? = null
)

data class SurveyAnswerDTO(
    var answerId: String? = null,
    var answerText: String? = null,
    var answerDisplayOrder: Int? = null,
    var answerScore: Int? = null
)
