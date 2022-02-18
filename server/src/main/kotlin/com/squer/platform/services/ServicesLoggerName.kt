package com.squer.platform.services

import com.squer.platform.services.logging.SquerLoggerName

enum class ServicesLoggerName(name: String): SquerLoggerName {

    Cache("cache");

    val loggerName: String = name

    override fun loggerName(): String {
        return name
    }
}