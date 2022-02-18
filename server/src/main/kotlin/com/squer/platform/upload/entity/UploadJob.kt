package com.squer.platform.upload.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerId
import java.util.*

@EntityMeta(prefix = "upljb", tableName = "FMK_UPLOAD_JOB" )
class UploadJob: AbstractAuditableEntity() {
    lateinit var configId: SquerId
    lateinit var startTime: Date
    lateinit var fileName: String
    var endTime: Date? = null
    lateinit var status: String
}