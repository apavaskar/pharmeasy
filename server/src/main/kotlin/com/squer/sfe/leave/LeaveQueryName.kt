package com.squer.sfe.leave

import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SquerQuery
enum class LeaveQueryName (override val query: AdhocQueryName): SquerQuery {
LEAVE_SELECT (AdhocQueryName("leave_select")),
LEAVE_INSERT (AdhocQueryName("leave_insert")),
LEAVE_UPDATE (AdhocQueryName("leave_update")),
LEAVE_DELETE (AdhocQueryName("leave_delete")),
LVBLC_SELECT (AdhocQueryName("lvblc_select")),
LVBLC_INSERT (AdhocQueryName("lvblc_insert")),
LVBLC_UPDATE (AdhocQueryName("lvblc_update")),
LVBLC_DELETE (AdhocQueryName("lvblc_delete")),
LVCFG_SELECT (AdhocQueryName("lvcfg_select")),
LVCFG_INSERT (AdhocQueryName("lvcfg_insert")),
LVCFG_UPDATE (AdhocQueryName("lvcfg_update")),
LVCFG_DELETE (AdhocQueryName("lvcfg_delete")),
/*===ADD TO FILE===*/
LEAVE_FOR_EMPLOYEE_SELECT(AdhocQueryName("leave_for_employee_select")),
LEAVE_BALANCE_FOR_EMPLOYEE_SELECT(AdhocQueryName("leave_balance_for_employee_select")),
LEAVE_TEMP_SELECT(AdhocQueryName("temp_leave_select")),
LEAVE_DETAILS_FOR_EMPLOYEE_SELECT(AdhocQueryName("leave_details_for_employee_select"))
;}
