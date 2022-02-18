package com.squer.consolidation.effort

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerEntity
import java.util.*

@EntityMeta(prefix = "deffr", tableName = "CON_DAILY_EFFORT_ROW")
class DailyEffortRow: SquerEntity() {
    lateinit var locationId: String
    lateinit var reportingDate: Date
    var reportingDateYyMm: Int = 0
    var reportingDateYyMmDd: Int = 0
    var individual: Boolean = true

    var countSuperCoreDr: Int = 0
    var countCoreDr: Int = 0
    var countNonCoreDr: Int = 0
    var countTotalDr: Int = 0

    var countSuperCoreRetailer: Int = 0
    var countCoreRetailer: Int = 0
    var countNonCoreRetailer: Int = 0
    var countTotalRetailer: Int = 0

    var countSuperCoreHospital: Int = 0
    var countCoreHospital: Int = 0
    var countNonCoreHospital: Int = 0
    var countTotalHospital: Int = 0

    var countSuperCoreDrReported: Int = 0
    var countCoreDrReported: Int = 0
    var countNonCoreDrReported: Int = 0
    var countTotalDrReported: Int = 0

    var countSuperCoreRetailerReported: Int = 0
    var countCoreRetailerReported: Int = 0
    var countNonCoreRetailerReported: Int = 0
    var countTotalRetailerReported: Int = 0

    var countSuperCoreHospitalReported: Int = 0
    var countCoreHospitalReported: Int = 0
    var countNonCoreHospitalReported: Int = 0
    var countTotalHospitalReported: Int = 0

    var countNCA: Int = 0
    var durationNCA: Double = 0.0

    var leaveDuration: Int = 0

    var countPhysicalSuperCoreDr = 0
    var countPhysicalCoreDr = 0
    var countPhysicalNonCoreDr = 0
    var countPhysicalTotalDr = 0

    var countPhysicalSuperCoreRetailer = 0
    var countPhysicalCoreRetailer = 0
    var countPhysicalNonCoreRetailer = 0
    var countPhysicalTotalRetailer = 0

    var countPhysicalSuperCoreHospital = 0
    var countPhysicalCoreHospital = 0
    var countPhysicalNonCoreHospital = 0
    var countPhysicalTotalHospital: Int = 0

    var countDigitalSuperCoreDr = 0
    var countDigitalCoreDr = 0
    var countDigitalNonCoreDr = 0
    var countDigitalTotalDr = 0

    var countDigitalSuperCoreRetailer = 0
    var countDigitalCoreRetailer = 0
    var countDigitalNonCoreRetailer = 0
    var countDigitalTotalRetailer = 0

    var countDigitalSuperCoreHospital = 0
    var countDigitalCoreHospital = 0
    var countDigitalNonCoreHospital = 0
    var countDigitalTotalHospital: Int = 0

}