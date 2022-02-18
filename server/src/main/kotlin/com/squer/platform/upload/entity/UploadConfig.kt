package com.squer.platform.upload.entity

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NameAwareEntity
import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.dao.StoreType

@EntityMeta(prefix = "uplcf", StoreType.Rdbms, model = "uploadConfigModel", tenantAware = true, tableName = "FMK_UPLOAD_CONFIG")
class UploadConfig : SquerEntity(), NameAwareEntity{
    var steps: List<UploadSteps> = ArrayList()
        get() = field
        set(value) {field = value}

    override var name: String = ""
        get() = field
        set(value) { field = value }
    override var ciName: String = ""
        get() = field
        set(value) { field = value}
}

@EntityMeta(prefix = "uplst", StoreType.Rdbms, tenantAware = true, tableName = "FMK_UPLOAD_CONFIG_STEPS")
class UploadSteps: SquerEntity() {
    lateinit var config: SquerId
    lateinit var typeId: String
    lateinit var sqlId: String
    lateinit var executorClass: String
    var stepNo: Int = 1
}