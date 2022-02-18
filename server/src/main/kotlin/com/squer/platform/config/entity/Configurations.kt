package com.squer.platform.config.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "confg", tableName = "FMK_CONFIG_MASTER")
class Configurations: AbstractStandardEntity() {
    var value: String? = null
    var configName: NamedSquerId? = null
    var location: NamedSquerId? = null
    var configType: NamedSquerId? = null
    var isActive: Boolean? = null
}