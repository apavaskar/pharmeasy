package com.squer.crm

import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SquerQuery

enum class CRMQueryName (override val query: AdhocQueryName): SquerQuery {
    CRMPS_SELECT (AdhocQueryName("crmps_select")),
}