
package com.squer.sfe.common.controller

import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.controller.dto.DmlStructureDTO
import com.squer.sfe.common.controller.dto.FieldStructureDTO
import com.squer.sfe.common.service.EmployeeService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import kotlin.jvm.Throws

@RequestMapping("/report")
@RestController
class ReportController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: EmployeeService

    @Throws(SquerException::class)
    @GetMapping("/filed-structure/{divisionId}")
    fun getFieldStructure(@PathVariable divisionId: String): List<FieldStructureDTO> {
        var searchCriteria = SearchCriteria(CommonQueryName.FIELD_STRUCTURE_SELECT.query)
        searchCriteria.addCondition("divisionId",divisionId)
        return repository.find(searchCriteria).filterIsInstance<FieldStructureDTO>()
    }

    @Throws(SquerException::class)
    @GetMapping("/dml-structure/{divisionId}")
    fun getDMLStructure(@PathVariable divisionId: String): List<DmlStructureDTO> {
        var searchCriteria = SearchCriteria(CommonQueryName.DML_STRUCTURE_SELECT.query)
        searchCriteria.addCondition("divisionId",divisionId)
        return repository.find(searchCriteria).filterIsInstance<DmlStructureDTO>()
    }

}