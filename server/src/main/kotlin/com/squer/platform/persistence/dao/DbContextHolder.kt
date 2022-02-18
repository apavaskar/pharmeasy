package com.squer.platform.persistence.dao

object DbContextHolder {
    private val contextHolder: ThreadLocal<DbParams> = ThreadLocal<DbParams>()

    val CONFIG_DB = "tenat00000000000000000000000000000000"

    var databaseType: DbParams
        get() = if (contextHolder.get() == null || contextHolder.get().tenantId == null) {
            DbParams(tenantId = CONFIG_DB, schemaName = "public")
        } else contextHolder.get()

        set(params) {
            contextHolder.set(params)
        }
}

data class DbParams(val tenantId: String, val schemaName: String)
