package com.squer.sfe.survey.service

import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import com.squer.sfe.survey.SurveyQueryName
import com.squer.sfe.survey.entity.SurveyResponseMaster
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.survey.controller.dto.SurveyResponseDTO
import com.squer.sfe.survey.entity.SurveyResponseAnswers
import com.squer.sfe.survey.entity.SurveyResponseDetails
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SurveyResponseMasterService {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var surveyResponseDetailsService: SurveyResponseDetailsService

    @Autowired
    lateinit var surveyResponseAnswersService: SurveyResponseAnswersService

    fun findById(id: String): SurveyResponseMaster {
        val searchCriteria = SearchCriteria(SurveyQueryName.SRVRM_SELECT.query)
        searchCriteria.addCondition("srvrm_id", id)
        return repository.find(searchCriteria).filterIsInstance<SurveyResponseMaster>().first()
    }

    fun create(entity: SurveyResponseMaster): SurveyResponseMaster {
        return repository.create(entity) as SurveyResponseMaster
    }

    fun update(entity: SurveyResponseMaster): SurveyResponseMaster {
        return repository.update(entity) as SurveyResponseMaster
    }

    fun findByParams(valueMap: Map<String,Any>): List<SurveyResponseMaster> {
            val searchCriteria = SearchCriteria(SurveyQueryName.SRVRM_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<SurveyResponseMaster>()
        }

    fun saveResponse(surveyDTO: SurveyResponseDTO): Boolean {
        try {
            var survey = SurveyResponseMaster()
            survey.survey = SquerId(surveyDTO.surveyId!!)
            survey.surveyBy = NamedSquerId(surveyDTO.surveyBy!!,"")
            survey.surveyFor = NamedSquerId(surveyDTO.surveyFor!!,"")
            survey.surveyDate = surveyDTO.surveyDate
            var surveyResponse = repository.create(survey) as SurveyResponseMaster

            surveyDTO.responseDetails!!.forEach{ it ->
                var responseDetails = SurveyResponseDetails()
                responseDetails.master = surveyResponse.id
                responseDetails.question = SquerId(it.questionId!!)
                responseDetails.score = it.score!!
                var response = surveyResponseDetailsService.create(responseDetails)

                it.answers!!.forEach{ ans ->
                    var responseAnswer = SurveyResponseAnswers()
                    responseAnswer.details = response.id
                    responseAnswer.answerId = ans.answerId!!
                    responseAnswer.answer = ans.answerText
                    surveyResponseAnswersService.create(responseAnswer)
                }
            }
            return true
        }catch (e: SquerException){
            throw Exception()
        }
    }
}