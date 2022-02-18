package com.squer.platform.upload

import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SquerQuery
import com.squer.platform.persistence.dao.StoreType

enum class UploadQueryName(override val query: AdhocQueryName): SquerQuery {
    UPLOAD_STEPS_SELECT(AdhocQueryName(name = "uplst_select")),
    UPLOAD_JOB_SELECT(AdhocQueryName(name = "upljb_select")),
    TMP_UPLOAD_ERROR_UPDATE(AdhocQueryName(name = "tmp_upload_error_update"))

}