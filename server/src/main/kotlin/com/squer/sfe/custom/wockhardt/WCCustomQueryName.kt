package com.squer.sfe.custom.wockhardt

import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SquerQuery
enum class WCCustomQueryName (override val query: AdhocQueryName): SquerQuery {
    WCSFC_SELECT(AdhocQueryName("wcsfc_select")),
    WCSFC_INSERT(AdhocQueryName("wcsfc_insert"))
}
