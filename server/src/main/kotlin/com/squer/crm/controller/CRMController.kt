package com.squer.crm.controller

import com.squer.crm.CRMQueryName
import com.squer.crm.controller.dto.CRMData
import com.squer.crm.entity.CRMProductStage
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.reports.controller.dto.CRMDashboardRow
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RequestMapping("/crm")
@RestController
class CRMController {

    @Autowired
    lateinit var repository: SquerRepository

    @GetMapping("/allstages")
    fun getAllStage(): List<CRMProductStage> {
        val criteria = SearchCriteria(CRMQueryName.CRMPS_SELECT.query)
        return repository.find(criteria).filterIsInstance<CRMProductStage>()
    }

    @GetMapping("/dashboard/{yearMonth}")
    fun getDashboard(@PathVariable yearMonth: Int): List<CRMDashboardRow> {
        val criteria = SearchCriteria(CRMQueryName.CRMPS_SELECT.query)
        val stages = repository.find(criteria).filterIsInstance<CRMProductStage>()
        var rows = mutableListOf<CRMDashboardRow>()
        for (stage in stages) {
            val row = CRMDashboardRow()
            row.met= 0
            row.dropped = 0
            row.product = stage.product
            row.stage = stage.stage
            rows.add(row)
        }
        return rows
    }

    @PostMapping("/sync")
    fun saveCRMData(@RequestBody data: CRMData ): Boolean {
        val allRows = data.rawData
        /*allRows.forEach { it ->
            repository.create(it)
        }*/
        val statuses = data.doctorStatus
        statuses.forEach { it ->
            repository.create(it)
        }
        return true
    }

}