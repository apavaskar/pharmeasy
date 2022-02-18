package com.squer.scheduledJob.custom.wockhardt

import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SquerQuery
enum class WockhardtQueryName (override val query: AdhocQueryName): SquerQuery {
SLBLK_SELECT (AdhocQueryName("slblk_select")),
SLBLK_INSERT (AdhocQueryName("slblk_insert")),
SLBLK_UPDATE (AdhocQueryName("slblk_update")),
SLBLK_DELETE (AdhocQueryName("slblk_delete")),
SCHJB_SELECT (AdhocQueryName("schjb_select")),
SCHJB_INSERT (AdhocQueryName("schjb_insert")),
SCHJB_UPDATE (AdhocQueryName("schjb_update")),
SCHJB_DELETE (AdhocQueryName("schjb_delete")),
/*===ADD TO FILE===*/
;}
