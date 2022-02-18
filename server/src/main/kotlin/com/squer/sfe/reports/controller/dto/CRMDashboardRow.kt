package com.squer.sfe.reports.controller.dto

import com.squer.platform.business.entity.NamedSquerId

class CRMDashboardRow {
    lateinit var product: NamedSquerId
    lateinit var stage: NamedSquerId
    var met: Int = 0
    var dropped: Int = 0
}