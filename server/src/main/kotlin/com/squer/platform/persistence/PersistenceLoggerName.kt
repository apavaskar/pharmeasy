package com.squer.platform.persistence

import com.squer.platform.services.logging.SquerLoggerName

enum class PersistenceLoggerName(name: String): SquerLoggerName {
    DAO("Dao"),
    AdhocQuery("AdhocQuery");

    val loggerName: String = name

    override fun loggerName(): String {
        return name
    }
}