package com.squer.sfe.reporting.controller

import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.entity.Employee
import com.squer.sfe.common.service.EmployeeService
import com.squer.sfe.reporting.service.SummaryService
import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.JasperReport
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.util.ResourceUtils
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.io.File
import kotlin.jvm.Throws

@RequestMapping("/summary")
@RestController
class SummaryController {
    @Autowired
    lateinit var summaryService: SummaryService

    @Autowired
    lateinit var employeeService: EmployeeService

    @Throws(SquerException::class)
    @GetMapping("/monthly/{yyyyMm}")
    fun consolidateMonthly(@PathVariable yyyyMm: Int): Boolean {
        return summaryService.monthlySummary(yyyyMm)
    }

    @Throws(SquerException::class)
    @GetMapping("/export")
    fun export(): Boolean {
        try {
            var file = File(this.javaClass.getResource("/reports/employee.jrxml").toURI())
            var jasperReport = JasperCompileManager.compileReport(file.absolutePath)
            var employeeList = mutableListOf<Employee>()
            employeeList.add(employeeService.findById("emply00000000000000000000000000000001"))
            var datasource = JRBeanCollectionDataSource(employeeList)
            var jasperPrint = JasperFillManager.fillReport(jasperReport, mutableMapOf(),datasource)
            var str = JasperExportManager.exportReportToHtmlFile(jasperPrint,"/Users/shriramgosavi/DataGeneration/emp.html")
            println(str)
            return true
        }catch (e: Exception){
            throw e
        }
    }
}