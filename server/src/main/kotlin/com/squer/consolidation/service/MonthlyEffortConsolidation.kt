package com.squer.consolidation.service

import com.squer.consolidation.ConsolidationQueryName
import com.squer.consolidation.effort.DailyEffortRow
import com.squer.consolidation.effort.MonthlyEffortRow
import com.squer.platform.multitenancy.service.TenantService
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.dao.DbContextHolder
import com.squer.platform.persistence.dao.DbParams
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.security.AuthenticationHandler
import com.squer.platform.services.ApiDate
import com.squer.sfe.common.DoctorClassificationEnum
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import java.util.*

@Service
class MonthlyEffortConsolidation {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var authHandler: AuthenticationHandler

    @Autowired
    lateinit var tenantService: TenantService


    @Scheduled(fixedRate = 3600 * 1000)
    fun populateNonReported() {
        authHandler.authenticateScheduler("tenat00000000000000000000000000000002")
        val tenant = tenantService.getTenantDefinition("tenat00000000000000000000000000000002")
        DbContextHolder.databaseType = DbParams(tenantId = tenant!!.id!!.id, tenant!!.code)

        val date = ApiDate(Date())
        val locationCriteria = SearchCriteria(ConsolidationQueryName.MEFFR_LOCATION_SELECT.query)
        locationCriteria.addCondition("meffr_month_year", date.yYY_MM)
        val locationsReported = (repository.find(locationCriteria) as List<Map<String, String>>).map{location -> location["meffr_location_id"]}

        val allLocationsCriteria = SearchCriteria(ConsolidationQueryName.DEFR_DOCTOR_CLASSIFICATION_SELECT.query)
        val allLocations = repository.find(allLocationsCriteria) as List<Map<String, Any>>
        var mapOfEfforts = mutableMapOf<String, MonthlyEffortRow>()
        allLocations.forEach { location ->
            if (!locationsReported.contains(location["doctr_location_id"])) {
                var effortReportRow = MonthlyEffortRow()
                effortReportRow.locationId = location["doctr_location_id"]!! as String
                effortReportRow.monthYear = date.yYY_MM

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


    //Get all doctor visits
    fun consolidate(locationId: String, apiDate: ApiDate,
                    effortRow: DailyEffortRow,
                    doctorListByClassification: MutableMap<String, MutableList<String>>,
                    visitsForMonth: List<Map<String, Any>>) {
        try {
            var monthlyEffortRow = MonthlyEffortRow()
            monthlyEffortRow.locationId = locationId
            monthlyEffortRow.monthYear = apiDate.yYY_MM
            initMonthlyEffortCounts(monthlyEffortRow, effortRow)
            updateCounts(doctorListByClassification, visitsForMonth, monthlyEffortRow)
            var mapOfConditions = mutableMapOf<String, Any>()
            mapOfConditions.put("meffr_location_id", locationId)
            mapOfConditions.put("meffr_month_year", apiDate.yYY_MM)
            repository.fireAdhoc(ConsolidationQueryName.MEFFR_REPORT_DELETE.query, mapOfConditions)
            repository.create(monthlyEffortRow)
        }catch(e: Exception) {
            e.printStackTrace()
        }
    }


    private fun initMonthlyEffortCounts(monthlyEffortRow: MonthlyEffortRow, effortRow: DailyEffortRow) {
        monthlyEffortRow.countSuperCoreDr = effortRow.countSuperCoreDr
        monthlyEffortRow.countCoreDr = effortRow.countCoreDr
        monthlyEffortRow.countNonCoreDr = effortRow.countNonCoreDr
        monthlyEffortRow.countTotalDr = effortRow.countTotalDr
    }

    private fun updateCounts(doctorListByClassification: MutableMap<String, MutableList<String>>,
                             visitsForMonth: List<Map<String, Any>>,
                             monthlyEffortRow: MonthlyEffortRow) {
        val classificationDoctors = mutableMapOf<String, MutableList<String>>()
        DoctorClassificationEnum.values().forEach { classification -> classificationDoctors[classification.value] = mutableListOf() }
        visitsForMonth.forEach { visit ->
            val doctorId = visit["dtvat_customer_id"]!! as String
            val classificationId = visit["doctr_classification_id"]!! as String
            var listOfDoctors = classificationDoctors[classificationId]!!
            listOfDoctors.add(doctorId)
            classificationDoctors[classificationId] = listOfDoctors
        }
        var listOfExistingDoctors = mutableListOf<String>()
        DoctorClassificationEnum.values().forEach { classification ->
            val doctors = classificationDoctors[classification.value]!!
            doctors.forEach { doctor ->
                if (!listOfExistingDoctors.contains(doctor)) {
                    val count = Collections.frequency(doctors, doctor)
                    listOfExistingDoctors.add(doctor)
                    if (classification.value == DoctorClassificationEnum.SUPER_CORE.value && count >= 3) {
                        monthlyEffortRow.countSuperCoreDrReported++

                    } else if (classification.value == DoctorClassificationEnum.CORE.value && count >= 2) {
                        monthlyEffortRow.countCoreDrReported++
                    } else if (classification.value == DoctorClassificationEnum.NON_CORE.value) {
                        monthlyEffortRow.countNonCoreDrReported++
                    }
                    monthlyEffortRow.countTotalDrReported++
                }
            }
        }
    }
}
