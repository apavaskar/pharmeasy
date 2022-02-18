package com.squer.sfe.survey.controller

import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.service.EmployeeProfileService
import com.squer.sfe.survey.SurveyQueryName
import com.squer.sfe.survey.controller.dto.EbDetailsDTO
import com.squer.sfe.survey.controller.dto.SurveyDetailsDTO
import com.squer.sfe.survey.controller.dto.SurveyResponseDTO
import com.squer.sfe.survey.controller.dto.TeamEBListDTO
import com.squer.sfe.survey.controller.enum.SurveyAnswerTypeEnum
import com.squer.sfe.survey.controller.enum.SurveyTypeEnum
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/eb")
@RestController
class EbController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var employeeProfileService: EmployeeProfileService

    @Throws(SquerException::class)
    @GetMapping("/team-list/{locationId}/{yyyyMMdd}")
    fun getById(@PathVariable locationId: String, @PathVariable yyyyMMdd: Int): List<TeamEBListDTO> {
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("emprf_location_id",locationId)
        valueMap.put("emprf_is_active",true)
        var employeeProfile = employeeProfileService.findByParams(valueMap)[0]

        var searchCriteria = SearchCriteria(SurveyQueryName.TEAM_EB_LIST_SELECT.query)
        searchCriteria.addCondition("locationId",locationId)
        searchCriteria.addCondition("surveyTypeId",SurveyTypeEnum.TM_EB_FORM.type.id)
        searchCriteria.addCondition("managerId",employeeProfile.employee!!.id)
        searchCriteria.addCondition("yyyyMMdd",yyyyMMdd)
        return repository.find(searchCriteria).filterIsInstance<TeamEBListDTO>()
    }

    @Throws(SquerException::class)
    @GetMapping("/details/{locationId}")
    fun getEbDetails(@PathVariable locationId: String, @RequestParam(defaultValue = "") responseId: String): EbDetailsDTO {
        var searchCriteria = SearchCriteria(SurveyQueryName.SURVY_DETAILS_SELECT.query)
        searchCriteria.addCondition("typeId", SurveyTypeEnum.TM_EB_FORM.type.id)
        var surveyData =  repository.find(searchCriteria).filterIsInstance<SurveyDetailsDTO>().first()
        var responseMap = mutableMapOf<String, String>()

        if(responseId!=""){
            var searchCriteriaResponse = SearchCriteria(SurveyQueryName.SURVY_RESPONSE_SELECT.query)
            searchCriteriaResponse.addCondition("masterId",responseId)
            var answerList = repository.find(searchCriteriaResponse).filterIsInstance<SurveyResponseDTO>()
            answerList.forEach { sr ->
                sr.responseDetails?.forEach { rd ->
                    rd.answers?.forEach { ans ->
                        if(rd.answerTypeId == SurveyAnswerTypeEnum.TEXT.type.id){
                            responseMap.put(rd.questionId!!, ans.answerText!!)
                        }else {
                            responseMap.put(rd.questionId!!, ans.answerId!!)
                        }
                    }
                }
            }
        }
        return EbDetailsDTO(surveyData,responseMap)
    }
}