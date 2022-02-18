package com.squer.consolidation

import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SquerQuery

enum class ConsolidationQueryName (override val query: AdhocQueryName): SquerQuery {
    DEFFR_SELECT(AdhocQueryName("deffr_select")),
    DEFFR_LOCATION_SELECT(AdhocQueryName("daily_location_visit_select")),
    MEFFR_LOCATION_SELECT(AdhocQueryName("month_location_visit_select")),
    DEFR_DOCTOR_CLASSIFICATION_SELECT(AdhocQueryName("doctor_by_classification_select")),
    MEFFR_SELECT(AdhocQueryName("meffr_select")),
    DOCTOR_CLASSIFICATION_SELECT (AdhocQueryName("doctor_classification_select")),
    DOCTOR_EFFORT_SELECT(AdhocQueryName("doctor_attendee_select")),
    MEFFR_REPORT_SELECT(AdhocQueryName("effort_report_select")),
    MEFFR_REPORT_DELETE(AdhocQueryName("monthly_report_delete")),
    DEFFR_REPORT_DELETE(AdhocQueryName("daily_report_delete"))
}

