package com.squer.sfe.reports.controller

import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.controller.dto.FieldStructureDTO
import com.squer.sfe.common.entity.LocationType
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reports.DrilldownReport
import com.squer.sfe.reports.ReportsQueryName
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate
import java.time.YearMonth
import java.time.format.DateTimeFormatter


@RequestMapping("/reports/effort")
@RestController
class EffortReport: DrilldownReport() {

    @Autowired
    lateinit var repository: SquerRepository

    @GetMapping("/deviation/{divisionId}/{yearMonth}")
    fun getDeviation(@PathVariable divisionId: String, @PathVariable yearMonth: Int): List<Map<String, Any>> {
        val yearMonthObject = YearMonth.of(1999, 2)
        val daysInMonth = yearMonthObject.lengthOfMonth() //28

        val criteria = SearchCriteria(ReportsQueryName.ALL_LOCATION_SELECT.query)
        criteria.addCondition("locationId", divisionId)
        val allLocations = repository.find(criteria).filterIsInstance<MutableMap<String, Any>>()
        var mapOfAllRows = mutableMapOf<String, Map<String, Any>>()
        val firstApiFormat = DateTimeFormatter.ofPattern("yyyyMMdd")
        allLocations.forEach {
            for(i in 1..daysInMonth) {
                var l = it.toMutableMap()
                l["dayOfMonth"]  = if (i < 10) "${yearMonth}0${i}" else "${yearMonth}${i}"
                l["planned"] = 0
                l["visited"] = 0
                l["date"] = LocalDate.parse(l["dayOfMonth"] as String , firstApiFormat)
                mapOfAllRows["${l["locat_id"]}${l["dayOfMonth"]}"] = l
            }
        }

        val plannedCriteria = SearchCriteria(ReportsQueryName.PLANNED_VISIT_SELECT.query)
        plannedCriteria.addCondition("locationId", divisionId)
        plannedCriteria.addCondition("yyyyMM", yearMonth)
        var planned = repository.find(plannedCriteria).filterIsInstance<MutableMap<String, Any>>()
        planned.forEach {
            val key = "${it["dtvat_location_id"]}${it["dtvat_yyyy_mm_dd"]}"
            var data = mapOfAllRows[key]!!.toMutableMap()
            data["planned"] = it["cnt"]!!
            mapOfAllRows[key] = data
        }

        val visitedCriteria = SearchCriteria(ReportsQueryName.REPORTED_VISIT_SELECT.query)
        visitedCriteria.addCondition("locationId", divisionId)
        visitedCriteria.addCondition("yyyyMM", yearMonth)
        var visited = repository.find(visitedCriteria).filterIsInstance<MutableMap<String, Any>>()
        visited.forEach {
            val key = "${it["dtvat_location_id"]}${it["dtvat_yyyy_mm_dd"]}"
            var data = mapOfAllRows[key]!!.toMutableMap()
            data["visited"] = it["cnt"]!!
            mapOfAllRows[key] = data
        }
        return mapOfAllRows.values.toList()
    }

    @GetMapping("/{divisionId}/{yearMonth}")
    fun getEfforts(@PathVariable divisionId: String, @PathVariable yearMonth: Int): List<Map<String, Any>> {
        try {
            val coverageCounts = getCoverageCount(divisionId, yearMonth).filterIsInstance<Map<String, Any>>()
                .associateBy({ it["dtvat_location_id"] as String }, { it })
            val callCounts = getCallCount(divisionId, yearMonth).filterIsInstance<Map<String, Any>>()
                .associateBy ({it["dtvat_location_id"] as String}, {it})
            val callTypeCounts = getCallTypeCount(divisionId, yearMonth, "syslv00000000000000000000000000000028", "syslv00000000000000000000000000000027")
                .associateBy ({it["dtvat_location_id"] as String}, {it})
            val fieldDaysCount = getCallTypeDaysCount(divisionId, yearMonth, "syslv00000000000000000000000000000024", "syslv00000000000000000000000000000025","except")
                .associateBy  ({it["dtvat_location_id"] as String}, {it})
            val nonCallDaysCount = getCallTypeDaysCount(divisionId, yearMonth, "syslv00000000000000000000000000000025", "syslv00000000000000000000000000000024","except")
                .associateBy  ({it["dtvat_location_id"] as String}, {it})
            val bothDaysCount = getCallTypeDaysCount(divisionId, yearMonth, "syslv00000000000000000000000000000024", "syslv00000000000000000000000000000025","intersect")
                .associateBy  ({it["dtvat_location_id"] as String}, {it})
          //  val chemistCount = getTotalChemists(divisionId).associateBy  ({it["chmst_location_id"] as String}, {it})
          //  val chemistCalls = getChemistCalls(divisionId, yearMonth).associateBy  ({it["dtvat_location_id"] as String}, {it})
           // val chemistCoverage = getChemistCoverage(divisionId, yearMonth).associateBy  ({it["dtvat_location_id"] as String}, {it})
            val leaveDays = getLeaveDays(divisionId, yearMonth).associateBy  ({it["dtvat_location_id"] as String}, {it})
            val jointDaysCount = getJointDays(divisionId, yearMonth).associateBy  ({it["dtvat_location_id"] as String}, {it})
            val holidaysCount = getHolidayCount(divisionId, yearMonth).associateBy  ({it["locat_id"] as String}, {it})
            val physicalDaysCount = getPhysicalDigitalCallDays(divisionId, yearMonth, "syslv00000000000000000000000000000028", "syslv00000000000000000000000000000027", "except" )
                                        .associateBy  ({it["dtvat_location_id"] as String}, {it})
            val digitalDaysCount = getPhysicalDigitalCallDays(divisionId, yearMonth, "syslv00000000000000000000000000000027", "syslv00000000000000000000000000000028", "except" )
                                        .associateBy  ({it["dtvat_location_id"] as String}, {it})
            val physicalDigitalDaysCount = getPhysicalDigitalCallDays(divisionId, yearMonth, "syslv00000000000000000000000000000027", "syslv00000000000000000000000000000028", "intersect" )
                .associateBy  ({it["dtvat_location_id"] as String}, {it})
            val fieldStructure = getFieldStructure(divisionId).associateBy ({it.tmLocationId!!}, {it})
            return getDML(divisionId, yearMonth, coverageCounts, callCounts, callTypeCounts, fieldDaysCount,
                          nonCallDaysCount, bothDaysCount, jointDaysCount,
                          leaveDays, holidaysCount, physicalDaysCount, digitalDaysCount, physicalDigitalDaysCount, fieldStructure)
        }catch(e: Exception) {
            e.printStackTrace()
            return mutableListOf()
        }
    }

    @GetMapping("/dailyeffort/{locationId}/{yearMonth}")
    fun getDailyCall(@PathVariable locationId: String, @PathVariable yearMonth: Int): List<Map<String, Any>> {
        val criteria = SearchCriteria(ReportsQueryName.DAILY_CALL_SELECT.query)
        criteria.addCondition("locationId", locationId)
        criteria.addCondition("yearMonth", yearMonth)
        return repository.find(criteria).filterIsInstance<Map<String, Any>>()
    }

    @GetMapping("/doctorvisit/{locationId}/{yearMonth}")
    fun getDoctorVisitReport(@PathVariable locationId: String, @PathVariable yearMonth: Int): List<Map<String, Any>> {
        val criteria = SearchCriteria(ReportsQueryName.DOCTOR_VISIT_REPORT_SELECT.query)
        criteria.addCondition("locationId", locationId)
        criteria.addCondition("yearMonth", yearMonth)
        return repository.find(criteria).filterIsInstance<Map<String, Any>>()
    }

    @GetMapping("/missedcall/{locationId}/{yearMonth}")
    fun getMissedCall(@PathVariable locationId: String, @PathVariable yearMonth: Int): List<Map<String, Any>> {
        val criteria = SearchCriteria(ReportsQueryName.MISSED_CALL_SELECT.query)
        criteria.addCondition("locationId", locationId)
        criteria.addCondition("yearMonth", yearMonth)
        return repository.find(criteria).filterIsInstance<Map<String, Any>>()
    }

    fun getDML(divisionId: String, yearMonth: Int,
               coverageCounts: Map<String, Map<String, Any>>,
               callCounts: Map<String, Map<String, Any>>,
               callTypeCounts: Map<String, Map<String, Any>>,
               fieldDaysCounts: Map<String, Map<String, Any>>,
               nonCallDaysCounts: Map<String, Map<String, Any>>,
               bothDaysCounts: Map<String, Map<String, Any>>,
               jointDaysCount: Map<String, Map<String, Any>>,
               leaveDays: Map<String, Map<String, Any>>,
               holidayCount: Map<String, Map<String, Any>>,
               physicalDaysCount: Map<String, Map<String, Any>>,
               digitalDaysCount: Map<String, Map<String, Any>>,
               physicalDigitalDaysCount: Map<String, Map<String, Any>>,
               fieldStructure: Map<String, FieldStructureDTO> ): List<Map<String, Any>> {
        val locationCriteria = SearchCriteria(CommonQueryName.ALL_LOCATION_SELECT.query)
        if (divisionId.startsWith("div"))
            locationCriteria.addCondition("divisionId", divisionId)
        else
            locationCriteria.addCondition("locationId", divisionId)
        locationCriteria.addCondition("locat_is_active", true)
        val allLocations  = repository.find(locationCriteria).filterIsInstance<MutableMap<String, Any>>()

        val criteria = SearchCriteria(CommonQueryName.DML_LOCATION_SELECT.query)
        if (divisionId.startsWith("div"))
            criteria.addCondition("divisionId", divisionId)
        else
            criteria.addCondition("locationId", divisionId)
        val locationTypesCriteria = SearchCriteria(CommonQueryName.LOCTT_SELECT.query)
        val locationTypes = repository.find(locationTypesCriteria).filterIsInstance<LocationType>().associateBy ( {it.id!!.id}, {it} )
        val dml = repository.find(criteria).filterIsInstance<MutableMap<String, Any>>().associateBy ({it.get("locat_id")}, {it})


        var list = mutableListOf<Map<String, Any>>()

        allLocations.forEach {
            val locationId = it["locat_id"] as String
            it.put("location_type", locationTypes[it["locat_type_id"]]!!)

            if (dml.contains(locationId)) {
                val row = dml.get(locationId)!!
                it["core_count"] = row["core_count"] as Long
                it["super_core_count"] = row["super_core_count"] as Long
                it["non_core_count"] = row["non_core_count"] as Long
                it["total_count"] = row["total_count"] as Long
            } else {
                it["core_count"] = 0
                it["super_core_count"] = 0
                it["non_core_count"] = 0
                it["total_count"] = 0
            }
            if (coverageCounts.containsKey(locationId)) {
                it["core_dr_count_visited"] = coverageCounts[locationId]!!["core_count"]!!
                it["super_core_dr_count_visited"] = coverageCounts[locationId]!!["super_core_count"]!!
                it["non_core_dr_count_visited"] = coverageCounts[locationId]!!["non_core_count"]!!
                it["total_dr_count_visited"] = coverageCounts[locationId]!!["total_count"]!!
            } else {
                it["core_dr_count_visited"] = 0
                it["super_core_dr_count_visited"] = 0
                it["non_core_dr_count_visited"] = 0
                it["total_dr_count_visited"] = 0
            }
            if (callCounts.containsKey(locationId)) {
                it["core_dr_call_count"] = callCounts[locationId]!!["core_count"]!!
                it["super_core_dr_call_count"] = callCounts[locationId]!!["super_core_count"]!!
                it["non_core_dr_call_count"] = callCounts[locationId]!!["non_core_count"]!!
                it["total_dr_call_count"] = (it["core_dr_call_count"] as Number).toInt() +
                                            (it["super_core_dr_call_count"] as Number).toInt() +
                                            (it["non_core_dr_call_count"] as Number).toInt()
            } else {
                it["core_dr_call_count"] = 0
                it["super_core_dr_call_count"] = 0
                it["non_core_dr_call_count"] = 0
                it["total_dr_call_count"] = 0
            }
            if (callTypeCounts.containsKey(locationId)) {
                it["digital_doctors"] = callTypeCounts[locationId]!!["digital_doctors"]!!
                it["distinct_digital_doctors"] = callTypeCounts[locationId]!!["distinct_digital_doctors"]!!
                it["physical_doctors"] = callTypeCounts[locationId]!!["physical_doctors"]!!
                it["distinct_physical_doctors"] = callTypeCounts[locationId]!!["distinct_physical_doctors"]!!
            } else {
                it["digital_doctors"] = 0
                it["distinct_digital_doctors"] = 0
                it["physical_doctors"] = 0
                it["distinct_physical_doctors"] = 0
            }
            if (fieldDaysCounts.containsKey(locationId)) {
                it["field_days"] = fieldDaysCounts[locationId]!!["count_days"]!!
            } else {
                it["field_days"] = 0.0
            }
            if (nonCallDaysCounts.containsKey(locationId)) {
                it["non_call_days"] = nonCallDaysCounts[locationId]!!["count_days"]!!
            } else {
                it["non_call_days"] = 0.0
            }
            if (bothDaysCounts.containsKey(locationId)) {
                val numDays = ((bothDaysCounts[locationId] as Map)["count_days"] as Number).toInt()
                it["field_days"] = (it["field_days"] as Number).toDouble() + numDays /2
                it["non_call_days"] = (it["non_call_days"] as Number).toDouble() + numDays/2
            }

            it["core_dr_coverage"] = calcCoverage(it["core_dr_count_visited"] as Number, it["core_count"] as Number)
            it["super_core_dr_coverage"] = calcCoverage(it["super_core_dr_count_visited"] as Number, it["super_core_count"] as Number)
            it["non_core_dr_coverage"] =  calcCoverage(it["non_core_dr_count_visited"] as Number, it["non_core_count"] as Number)
            it["total_dr_coverage"] =  calcCoverage(it["total_dr_count_visited"] as Number, it["total_count"] as Number)
            it["physical_call_coverage"] = calcCoverage(it["distinct_physical_doctors"] as Number, it["total_count"] as Number)
            it["digital_call_coverage"] = calcCoverage(it["distinct_digital_doctors"] as Number, it["total_count"] as Number)

            if ((it["field_days"] as Number).toDouble() != 0.0) {
                val fieldDays = (it["field_days"] as Number).toDouble()
                it["physical_call_average"] = ((it["physical_doctors"] as Number).toDouble() / fieldDays).toInt()
                it["digital_call_average"] =  ((it["digital_doctors"] as Number).toDouble() / fieldDays).toInt()
                it["overall_call_average"] =  ((it["total_dr_call_count"] as Number).toDouble() / fieldDays).toInt()
            } else {
                it["physical_call_average"] = 0
                it["digital_call_average"] =  0
                it["overall_call_average"] =  0
            }

            it["chemist_days"] = it["field_days"]!!
            if ((it["chemist_days"] as Number).toInt() != 0) {
                it["chemist_call_average"] = ((it["chemist_calls"] as Number).toInt() / (it["chemist_days"] as Number).toInt()).toInt()
            } else {
                it["chemist_call_average"] = 0
            }

            if (jointDaysCount.containsKey(locationId)) {
                it["joint_count_days"] = (jointDaysCount[locationId]!!["count_days"]!! as Number).toInt()
            } else {
                it["joint_count_days"] = 0
            }

            if (leaveDays.containsKey(locationId)) {
                it["leave_days"] = (leaveDays[locationId]!!["count_days"]!! as Number).toInt()
            } else {
                it["leave_days"] = 0
            }
            if (holidayCount.containsKey(locationId)) {
                it["holiday_count"] = (holidayCount[locationId]!!["hoilday_count"]!! as Number).toInt()
            } else {
                it["holiday_count"] = 0
            }
            if(physicalDaysCount.containsKey(locationId)) {
                it["physical_days"] = (physicalDaysCount[locationId]!!["count_days"] as Number).toInt()
            } else {
                it["physical_days"] = 0
            }

            if(digitalDaysCount.containsKey(locationId)) {
                it["digital_days"] = (digitalDaysCount[locationId]!!["count_days"] as Number).toInt()
            } else {
                it["digital_days"] = 0
            }

            if(physicalDigitalDaysCount.containsKey(locationId)) {
                it["physical_digital_days"] = (physicalDigitalDaysCount[locationId]!!["count_days"] as Number).toInt()
            } else {
                it["physical_digital_days"] = 0
            }

            if (fieldStructure.containsKey(locationId)) {
                it["field_structure"] = fieldStructure[locationId]!!
            }

            it["month_year"] = "${yearMonth.toString().substring(4)}-${yearMonth.toString().substring(0,4)}"

            list.add(it)
        }
        return list
    }

    fun getCoverageCount(divisionId: String, yearMonth: Int): List<Map<String, Any>> {
        val criteria = SearchCriteria(ReportsQueryName.DML_COVERAGE_COUNT_SELECT.query)
        if (divisionId.startsWith("div"))
            criteria.addCondition("divisionId", divisionId)
        else
            criteria.addCondition("locationId", divisionId)
        criteria.addCondition("dtvat_yyyy_mm", yearMonth)

        return repository.find(criteria).filterIsInstance<Map<String, Any>>()
    }

    fun getCallCount(divisionId: String, yearMonth: Int): List<Map<String, Any>> {
        val criteria = SearchCriteria(ReportsQueryName.DML_CALL_COUNT_SELECT.query)
        if (divisionId.startsWith("div"))
            criteria.addCondition("divisionId", divisionId)
        else
            criteria.addCondition("locationId", divisionId)
        criteria.addCondition("dtvat_yyyy_mm", yearMonth)

        return repository.find(criteria).filterIsInstance<Map<String, Any>>()
    }

    fun getCallTypeCount(divisionId: String, yearMonth: Int, type1: String, type2: String): List<Map<String, Any>> {
        val criteria = SearchCriteria(ReportsQueryName.DML_CALL_TYPE_COUNT_SELECT.query)
        if (divisionId.startsWith("div"))
            criteria.addCondition("divisionId", divisionId)
        else
            criteria.addCondition("locationId", divisionId)
        criteria.addCondition("type1", type1)
        criteria.addCondition("type2", type2)
        criteria.addCondition("dtvat_yyyy_mm", yearMonth)

        return repository.find(criteria).filterIsInstance<Map<String, Any>>()
    }

    fun getCallTypeDaysCount(divisionId: String, yearMonth: Int, type1: String, type2: String, action: String): List<Map<String, Any>> {
        val criteria = SearchCriteria(ReportsQueryName.DML_CALL_TYPE_DAYS_SELECT.query)
        if (divisionId.startsWith("div"))
            criteria.addCondition("divisionId", divisionId)
        else
            criteria.addCondition("locationId", divisionId)
        criteria.addCondition("type1", type1)
        criteria.addCondition("type2", type2)
        criteria.addCondition("dtvat_yyyy_mm", yearMonth)
        criteria.addCondition("action", action)
        return repository.find(criteria).filterIsInstance<Map<String, Any>>()
    }

    fun getTotalChemists(divisionId: String): List<Map<String, Any>> {
        val criteria = SearchCriteria(CommonQueryName.CHEMIST_COUNT_SELECT.query)
        if (divisionId.startsWith("div"))
            criteria.addCondition("divisionId", divisionId)
        else
            criteria.addCondition("locationId", divisionId)
        return repository.find(criteria).filterIsInstance<Map<String, Any>>()
    }

    fun getChemistCalls(divisionId: String, yearMonth: Int): List<Map<String, Any>> {
        val criteria = SearchCriteria(ReportingQueryName.CHEMIST_CALL_COUNT.query)
        if (divisionId.startsWith("div"))
            criteria.addCondition("divisionId", divisionId)
        else
            criteria.addCondition("locationId", divisionId)
        criteria.addCondition("dtvat_yyyy_mm", yearMonth)
        return repository.find(criteria).filterIsInstance<Map<String, Any>>()
    }

    fun getChemistCoverage(divisionId: String, yearMonth: Int): List<Map<String, Any>> {
        val criteria = SearchCriteria(ReportingQueryName.CHEMIST_COVERAGE_COUNT.query)
        if (divisionId.startsWith("div"))
            criteria.addCondition("divisionId", divisionId)
        else
            criteria.addCondition("locationId", divisionId)
        criteria.addCondition("dtvat_yyyy_mm", yearMonth)
        return repository.find(criteria).filterIsInstance<Map<String, Any>>()
    }

    fun getJointDays(divisionId: String, yearMonth: Int): List<Map<String, Any>> {
        val criteria = SearchCriteria(ReportingQueryName.JOINT_DAYS_COUNT.query)
        if (divisionId.startsWith("div"))
            criteria.addCondition("divisionId", divisionId)
        else
            criteria.addCondition("locationId", divisionId)
        criteria.addCondition("dtvat_yyyy_mm", yearMonth)
        return repository.find(criteria).filterIsInstance<Map<String, Any>>()
    }

    fun getLeaveDays(divisionId: String, yearMonth: Int): List<Map<String, Any>> {
        val criteria = SearchCriteria(ReportingQueryName.LEAVE_DAYS_COUNT.query)
        if (divisionId.startsWith("div"))
            criteria.addCondition("divisionId", divisionId)
        else
            criteria.addCondition("locationId", divisionId)
        criteria.addCondition("dtvat_yyyy_mm", yearMonth)
        return repository.find(criteria).filterIsInstance<Map<String, Any>>()
    }

    fun getHolidayCount(divisionId: String, yearMonth: Int): List<Map<String, Any>> {
        val criteria = SearchCriteria(ReportingQueryName.HOLIDAY_COUNT_SELECT.query)
        if (divisionId.startsWith("div"))
            criteria.addCondition("divisionId", divisionId)
        else
            criteria.addCondition("locationId", divisionId)
        criteria.addCondition("dtvat_yyyy_mm", yearMonth)
        return repository.find(criteria).filterIsInstance<Map<String, Any>>()
    }

    fun getPhysicalDigitalCallDays(divisionId: String, yearMonth: Int, type1: String, type2: String, action: String): List<Map<String, Any>> {
        val criteria = SearchCriteria(ReportingQueryName.PHYSICAL_DIGITAL_CALL_DAYS_SELECT.query)
        if (divisionId.startsWith("div"))
            criteria.addCondition("divisionId", divisionId)
        else
            criteria.addCondition("locationId", divisionId)
        criteria.addCondition("type1", type1)
        criteria.addCondition("type2", type2)
        criteria.addCondition("dtvat_yyyy_mm", yearMonth)
        criteria.addCondition("action", action)

        return repository.find(criteria).filterIsInstance<Map<String, Any>>()
    }

    fun getFieldStructure
                (divisionId: String): List<FieldStructureDTO> {
        val criteria = SearchCriteria(CommonQueryName.FIELD_STRUCTURE_SELECT.query)
        if (divisionId.startsWith("div"))
            criteria.addCondition("divisionId", divisionId)
        else
            criteria.addCondition("locationId", divisionId)
        return repository.find(criteria).filterIsInstance<FieldStructureDTO>()
    }

    private fun calcCoverage(visited: Number, total: Number): Int {
        if (total.toInt() == 0) return 0
        return (visited.toDouble() / total.toDouble() * 100).toInt()
    }
}

