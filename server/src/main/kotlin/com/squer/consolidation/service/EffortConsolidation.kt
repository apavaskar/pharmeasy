package com.squer.consolidation.service

import com.squer.consolidation.ConsolidationQueryName
import com.squer.consolidation.effort.DailyEffortRow
import com.squer.platform.jms.MessageWrapper
import com.squer.platform.multitenancy.service.TenantService
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.dao.DbContextHolder
import com.squer.platform.persistence.dao.DbParams
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.security.AuthenticationHandler
import com.squer.platform.services.ApiDate
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.DoctorClassificationEnum
import com.squer.sfe.common.entity.Location
import com.squer.sfe.reporting.ReportTypeEnum
import com.squer.sfe.reports.controller.dto.EffortReportRow
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jms.annotation.JmsListener
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import java.lang.Exception
import java.util.*

//TODO separate queries for visit
@Service
class EffortConsolidation {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var authHandler: AuthenticationHandler
    @Autowired
    lateinit var tenantService: TenantService
    @Autowired
    lateinit var monthlyEffortConsolidation: MonthlyEffortConsolidation

    @Scheduled(fixedRate = 3600 * 1000)
    fun populateNonReported() {
        authHandler.authenticateScheduler("tenat00000000000000000000000000000002")
        val tenant = tenantService.getTenantDefinition("tenat00000000000000000000000000000002")
        DbContextHolder.databaseType = DbParams(tenantId = tenant!!.id!!.id, tenant!!.code)

        val date = ApiDate(Date())
        val locationCriteria = SearchCriteria(ConsolidationQueryName.DEFFR_LOCATION_SELECT.query)
        locationCriteria.addCondition("deffr_reporting_date_yy_mm_dd", date.yYYY_MM_DD)
        val locationsReported = (repository.find(locationCriteria) as List<Map<String, String>>).map{location -> location["deffr_location_id"]}

        val allLocationsCriteria = SearchCriteria(ConsolidationQueryName.DEFR_DOCTOR_CLASSIFICATION_SELECT.query)
        val allLocations = repository.find(allLocationsCriteria) as List<Map<String, Any>>
        var mapOfEfforts = mutableMapOf<String, DailyEffortRow>()
        allLocations.forEach { location ->
            if (!locationsReported.contains(location["doctr_location_id"])) {
                var effortReportRow = DailyEffortRow()
                effortReportRow.locationId = location["doctr_location_id"]!! as String
                effortReportRow.reportingDate = date.date!!
                effortReportRow.reportingDateYyMmDd = date.yYYY_MM_DD
                effortReportRow.reportingDateYyMm = date.yYY_MM

                if (mapOfEfforts.containsKey(location["doctr_location_id"])) {
                    effortReportRow = mapOfEfforts[location["doctr_location_id"]]!!
                }
                val classification = location["doctr_classification_id"]
                when (classification) {
                    DoctorClassificationEnum.SUPER_CORE.value ->  effortReportRow.countSuperCoreDr = (location["cnt"]!! as Long).toInt()
                    DoctorClassificationEnum.CORE.value ->  effortReportRow.countCoreDr = (location["cnt"]!! as Long).toInt()
                    DoctorClassificationEnum.NON_CORE.value ->  effortReportRow.countNonCoreDr = (location["cnt"]!! as Long).toInt()
                }
                effortReportRow.countTotalDr = effortReportRow.countSuperCoreDr + effortReportRow.countCoreDr + effortReportRow.countNonCoreDr
                mapOfEfforts.put(location["doctr_location_id"]!! as String, effortReportRow)
            }
        }
        mapOfEfforts.values.forEach{effort -> repository.create(effort)}

    }

    fun consolidate(messageWrapper: MessageWrapper ) {
        try {
            println("RECEIVED MESSAGE" + messageWrapper.key + "," + messageWrapper.tenantId)
            authHandler.authenticateScheduler(messageWrapper.tenantId)
            val tenant = tenantService.getTenantDefinition(messageWrapper.tenantId)
            DbContextHolder.databaseType = DbParams(tenantId = tenant!!.id!!.id, tenant!!.code)

            val key = messageWrapper.key
            val locationId = key["locationId"] as String
            val date = Date(key["date"] as Long)
            val apiDate = ApiDate(date)

            val visitsInMonth = getVisitsForMonth(locationId, apiDate)
            val visitsForDate = visitsInMonth.filter { visit -> visit["dtvat_yyyy_mm_dd"] as Int == apiDate.yYYY_MM_DD }

            var effortRow = DailyEffortRow()
            effortRow.locationId = locationId
            effortRow.reportingDate = date
            effortRow.reportingDateYyMm = apiDate.yYY_MM
            effortRow.reportingDateYyMmDd = apiDate.yYYY_MM_DD
            val doctorListByClassification = getDML(locationId, apiDate, visitsInMonth, effortRow)
            updateVisitCounts(visitsForDate, doctorListByClassification, effortRow)

            var mapOfConditions = mutableMapOf<String, Any>()
            mapOfConditions.put("deffr_location_id", locationId)
            mapOfConditions.put("deffr_month_year_date", apiDate.yYYY_MM_DD)
            repository.fireAdhoc(ConsolidationQueryName.MEFFR_REPORT_DELETE.query, mapOfConditions)

            repository.create(effortRow)
            monthlyEffortConsolidation.consolidate(locationId, apiDate, effortRow, doctorListByClassification, visitsInMonth)
        }catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun getDML(locationId: String, date: ApiDate, visits: List<Map<String, Any>>, effortRow: DailyEffortRow): MutableMap<String, MutableList<String>> {
        var doctorCriteria = SearchCriteria(ConsolidationQueryName.DOCTOR_CLASSIFICATION_SELECT.query)
        doctorCriteria.addCondition("doctr_location_id", locationId)
        var activeDoctors = repository.find(doctorCriteria) as MutableList<Map<String, String>>
        var dmlList = (activeDoctors.map {doctor -> doctor["doctr_id"]  }).toMutableList()
        visits.forEach {visit ->
            val doctorId = visit["dtvat_customer_id"] as String
            if (!dmlList.contains(doctorId)) {
                dmlList.add(doctorId)
                val row = mutableMapOf<String, String>("doctr_id" to visit["dtvat_customer_id"]!! as String,
                                                       "doctr_classification_id" to visit["doctr_classification_id"]!! as String)
                activeDoctors.add(row)
            }
        }
        val doctorListByClassification = mutableMapOf<String, MutableList<String>>()
        DoctorClassificationEnum.values().forEach { classification -> doctorListByClassification[classification.value] = mutableListOf() }
        activeDoctors.forEach {doctor ->
            var list = doctorListByClassification[doctor["doctr_classification_id"]]
            list!!.add(doctor["doctr_id"]!!)
            doctorListByClassification[doctor["doctr_classification_id"]!!] = list
        }
        effortRow.countTotalDr = activeDoctors.size
        effortRow.countSuperCoreDr = doctorListByClassification[DoctorClassificationEnum.SUPER_CORE.value]!!.size
        effortRow.countCoreDr =  doctorListByClassification[DoctorClassificationEnum.CORE.value]!!.size
        effortRow.countNonCoreDr =  doctorListByClassification[DoctorClassificationEnum.NON_CORE.value]!!.size
        return doctorListByClassification
    }

    private fun getVisitsForMonth(locationId: String, date: ApiDate): List<Map<String, Any>> {
        var visitCriteria = SearchCriteria(ConsolidationQueryName.DOCTOR_EFFORT_SELECT.query)
        visitCriteria.addCondition("dtvat_location_id", locationId)
        visitCriteria.addCondition("dtvat_yyyy_mm", date.yYY_MM)
        visitCriteria.addCondition("dtvat_is_reported", true)
        return repository.find(visitCriteria) as List<Map<String, String>>
    }

    private fun updateVisitCounts(visitsForDate: List<Map<String, Any>>,
                                  doctorListByClassification: MutableMap<String, MutableList<String>>,
                                  effortRow: DailyEffortRow) {
        visitsForDate.forEach {visit ->
            val doctorId = visit["dtvat_customer_id"]
            val visitType = visit["dtvat_visit_type_id"]!!
            val classificationId = visit["doctr_classification_id"]
            val dmlList = doctorListByClassification[classificationId!!]
            effortRow.countTotalDrReported++
            if (dmlList!!.contains(doctorId)) {
                when (classificationId) {
                    DoctorClassificationEnum.SUPER_CORE.value -> {
                        effortRow.countSuperCoreDrReported++
                        if (visitType == ReportTypeEnum.DIGITAL_CALL.typeId) {
                            effortRow.countDigitalSuperCoreDr++
                        } else {
                            effortRow.countPhysicalSuperCoreDr++
                        }
                    }
                    DoctorClassificationEnum.CORE.value -> {
                        effortRow.countCoreDrReported++
                        if (visitType == ReportTypeEnum.DIGITAL_CALL.typeId) {
                            effortRow.countDigitalCoreDr++
                        } else {
                            effortRow.countPhysicalCoreDr++
                        }
                    }
                    DoctorClassificationEnum.NON_CORE.value -> {
                        effortRow.countNonCoreDrReported++
                        if (visitType == ReportTypeEnum.DIGITAL_CALL.typeId) {
                            effortRow.countDigitalNonCoreDr++
                        } else {
                            effortRow.countPhysicalNonCoreDr++
                        }
                    }
                }
            }
        }
    }

}