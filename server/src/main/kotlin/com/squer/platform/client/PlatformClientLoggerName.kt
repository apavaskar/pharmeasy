package com.squer.platform.client

import com.squer.platform.services.logging.SquerLoggerName

enum class PlatformClientLoggerName(name: String): SquerLoggerName {
    Controller("controller"),
    Functionality("functionality"),
    Security("security");

    val loggerName: String = name

    override fun loggerName(): String {
        return name
    }
}