package com.squer.platform.business.entity

@EntityMeta(prefix = "appcg", tableName = "FMK_APP_CONFIG")
data class AppConfig(val adminPassword: String, val version: String) : AbstractAuditableEntity()
