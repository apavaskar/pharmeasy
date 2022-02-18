package com.squer.sfe.reporting.entity

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.business.entity.SquerId
import java.util.*

@EntityMeta(prefix = "rptuh", tableName = "RPT_REPORTING_UNLOCK_HISTORY")
class ReportingUnlockHistory: SquerEntity() {
    lateinit var employee: NamedSquerId
    lateinit var fromDate: Date
    var fromDateYyyyMm: Int = 0
    var fromDateYyyyMmDd: Int = 0
    lateinit var toDate: Date
    var toDateYyyyMm: Int = 0
    var toDateYyyyMmDd: Int = 0
    var unlockedOn: Date? = null
    var unlockedBy: SquerId? = null
    var status: String = "SUBMITTED"
}