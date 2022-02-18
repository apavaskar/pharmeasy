package com.squer.sfe

import com.squer.platform.services.logging.SquerLogLevel
import com.squer.platform.services.logging.SquerLogger
import com.squer.platform.services.logging.SquerLoggerName
import org.junit.jupiter.api.Test

class SquerLoggerTest {

    @Test
    fun changeLogTest() {
        val logger = SquerLogger.getLogger(TestLogger.Test)
        println(logger.getLevel())
        logger.debug("Debug me")
        logger.error("Debug me Error")
        logger.changeLevel(TestLogger.Test, SquerLogLevel.DEBUG)
        println(logger.getLevel())
        logger.debug("Debug me!")
        logger.error("Debug me Error!")

    }

}

enum class TestLogger constructor(name: String): SquerLoggerName {
    Test("Test");
    val loggerName: String = name

    override fun loggerName(): String {
        return name
    }
}