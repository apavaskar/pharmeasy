package com.squer.sfe.reports

import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SquerQuery

enum class ReportsQueryName(override val query: AdhocQueryName): SquerQuery {
    EFFORT_REPORTS_SELECT(AdhocQueryName("effort_reports_select")),
    EFFORT_REPORTS_CLASSIFICATION_SELECT(AdhocQueryName("effort_reports_classification_select")),
    EFFORT_REPORTS_BOTH_TYPES_SELECT(AdhocQueryName("effort_reports_both_days_select")),
    EFFORT_REPORTS_SINGLE_TYPES_SELECT(AdhocQueryName("effort_reports_single_days_select")),
    EFFORT_REPORTS_FIELD_DAYS_SELECT(AdhocQueryName("effort_reports_field_days_select")),
    EFFORT_REPORTS_NON_CALL_DAYS_SELECT(AdhocQueryName("effort_reports_non_call_days_select")),
    EFFORT_REPORTS_LEAVE_DAYS_SELECT(AdhocQueryName("effort_reports_leaves_select")),
    EFFORT_REPORTS_VISIT_TYPE_SELECT(AdhocQueryName("effort_reports_visit_type_select")),

    DML_COVERAGE_COUNT_SELECT(AdhocQueryName("dml_coverage_count_select")),
    DML_CALL_COUNT_SELECT(AdhocQueryName("dml_call_count_select")),
    DML_CALL_TYPE_COUNT_SELECT(AdhocQueryName("dml_call_type_count_select")),
    DML_CALL_TYPE_DAYS_SELECT(AdhocQueryName("dml_call_type_days_select")),
    MISSED_CALL_SELECT(AdhocQueryName("missed_call_select")),
    DAILY_CALL_SELECT(AdhocQueryName("daily_report_select")),
    DOCTOR_VISIT_REPORT_SELECT(AdhocQueryName("doctor_visit_report_select")),

    ALL_LOCATION_SELECT(AdhocQueryName("all_location_select")),
    PLANNED_VISIT_SELECT(AdhocQueryName("planned_visits_select")),
    REPORTED_VISIT_SELECT(AdhocQueryName("reported_visits_select"))
}
