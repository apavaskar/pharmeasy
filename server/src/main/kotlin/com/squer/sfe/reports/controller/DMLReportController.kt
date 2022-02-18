package com.squer.sfe.reports.controller

import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.controller.dto.DmlStructureDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/reports/customer")
@RestController
class DMLReportController {

    @Autowired
    lateinit var repository: SquerRepository

    @GetMapping("/dml/{divisionId}")
    fun getDMLReport(@PathVariable divisionId: String): List<DmlStructureDTO> {
        val dmlCriteria = SearchCriteria(CommonQueryName.DML_STRUCTURE_SELECT.query)
        if (divisionId.startsWith("div"))
            dmlCriteria.addCondition("divisionId", divisionId)
        else
            dmlCriteria.addCondition("locationId", divisionId)
        return repository.find(dmlCriteria).filterIsInstance<DmlStructureDTO>()
    }
}