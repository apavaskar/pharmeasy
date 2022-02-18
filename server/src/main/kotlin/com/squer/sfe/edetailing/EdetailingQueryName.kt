package com.squer.sfe.edetailing

import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SquerQuery
enum class EdetailingQueryName (override val query: AdhocQueryName): SquerQuery {
DTLIN_SELECT (AdhocQueryName("dtlin_select")),
DTLIN_INSERT (AdhocQueryName("dtlin_insert")),
DTLIN_UPDATE (AdhocQueryName("dtlin_update")),
DTLIN_DELETE (AdhocQueryName("dtlin_delete")),
DTLFQ_SELECT (AdhocQueryName("dtlfq_select")),
DTLFQ_INSERT (AdhocQueryName("dtlfq_insert")),
DTLFQ_UPDATE (AdhocQueryName("dtlfq_update")),
DTLFQ_DELETE (AdhocQueryName("dtlfq_delete")),
DTLFL_SELECT (AdhocQueryName("dtlfl_select")),
DTLFL_INSERT (AdhocQueryName("dtlfl_insert")),
DTLFL_UPDATE (AdhocQueryName("dtlfl_update")),
DTLFL_DELETE (AdhocQueryName("dtlfl_delete")),
DTLST_SELECT (AdhocQueryName("dtlst_select")),
DTLST_INSERT (AdhocQueryName("dtlst_insert")),
DTLST_UPDATE (AdhocQueryName("dtlst_update")),
DTLST_DELETE (AdhocQueryName("dtlst_delete")),
DTLMT_SELECT (AdhocQueryName("dtlmt_select")),
DTLMT_INSERT (AdhocQueryName("dtlmt_insert")),
DTLMT_UPDATE (AdhocQueryName("dtlmt_update")),
DTLMT_DELETE (AdhocQueryName("dtlmt_delete")),
/*===ADD TO FILE===*/
;}
