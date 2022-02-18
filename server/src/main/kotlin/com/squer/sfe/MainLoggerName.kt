package com.squer.sfe

import com.squer.platform.services.logging.SquerLoggerName

enum class MainLoggerName(name: String): SquerLoggerName {

    Main("main");

    val loggerName: String = name

    override fun loggerName(): String {
        return name
    }
}