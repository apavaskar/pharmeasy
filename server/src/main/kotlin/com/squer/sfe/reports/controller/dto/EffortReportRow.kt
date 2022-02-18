package com.squer.sfe.reports.controller.dto

class EffortReportRow(var locationId: String, var locationName: String,
                      var locationTypeId: String, var locationTypeName: String) {
    var countSuperCoreDrMet: Int = 0
    var countTotalSuperCoreDr: Int = 0

    var countCoreDrMet: Int = 0
    var countTotalCoreDr: Int = 0

    var countNonCoreDrMet: Int = 0
    var countTotalNonCoreDr: Int = 0

    var countTotalDrMet: Int = 0
    var countTotalDr: Int = 0

    var countBothDays: Int = 0
    var countPhysicalDays: Int = 0
    var countDigitalDays: Int = 0

    var countFD: Double = 0.0
    var countNCD: Double = 0.0
    var countLeaveD: Double = 0.0

    var countPhysicalDr: Int = 0
    var countDigitalDr: Int = 0

    var superCoreCoverage: Double = 0.0
    var coreCoverage: Double = 0.0
    var overallCoverage: Double = 0.0

    var physicalCallAverage: Double = 0.0
    var digitalCallAverage: Double = 0.0
    var overallCallAverage: Double = 0.0

}