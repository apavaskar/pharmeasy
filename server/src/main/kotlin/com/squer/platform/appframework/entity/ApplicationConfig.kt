package com.squer.platform.appframework.entity

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerEntity

@EntityMeta(prefix="fmcfg", tableName = "FMK_FUNCTIONALITY_CONFIG")
class ApplicationConfig: SquerEntity() {
    lateinit var applicableTo: String
    lateinit var configValue: String
}