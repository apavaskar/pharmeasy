package com.squer.sfe.survey.controller.enum

import com.squer.platform.business.entity.NamedSquerId

enum class SurveyAnswerTypeEnum (var type: NamedSquerId) {
    TEXT(NamedSquerId("syslv00000000000000000000000000000138","Text")),
    RADIO(NamedSquerId("syslv00000000000000000000000000000139","Radio")),
}