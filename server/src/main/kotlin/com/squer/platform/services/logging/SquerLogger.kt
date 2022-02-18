package com.squer.platform.services.logging

import ch.qos.logback.classic.Level
import ch.qos.logback.classic.Logger
import ch.qos.logback.classic.LoggerContext
import org.apache.logging.log4j.Level.getLevel
import org.slf4j.LoggerFactory


class SquerLogger constructor(logger: Logger) {
    private val logger: Logger = logger;


    companion object {
        private val loggerMap = mutableMapOf<String, SquerLogger>()

        fun getLogger(loggerName: SquerLoggerName) : SquerLogger {
            if (loggerMap.containsKey(loggerName.loggerName())) {
                return loggerMap.get(loggerName.loggerName())!!
            }
            val logger: SquerLogger = getDefaultInstance(loggerName)
            loggerMap.put(loggerName.loggerName(), logger)
            return logger
        }

        private fun getDefaultInstance(loggerName: SquerLoggerName): SquerLogger {
            val loggerContext = LoggerFactory.getILoggerFactory() as LoggerContext
            val logger: Logger = loggerContext.getLogger(loggerName.loggerName())
            logger.level = Level.DEBUG
            return SquerLogger(logger)
        }
    }


    fun changeLevel(name: SquerLoggerName, level: SquerLogLevel) {
        var logger = loggerMap.get(name.loggerName())
        if (logger == null)
            logger = getDefaultInstance(name)
        logger.logger.level = level.getLevel()
        loggerMap.put(name.loggerName(), logger)
    }

    fun getLevel() : SquerLogLevel {
        return SquerLogLevel.get(logger.level)
    }

    fun debug(log: String) {
        logger.debug(log)
    }

    fun error(log: String ) {
        logger.error(log)
    }

    fun error(log: String, error: Throwable) {
        logger.error(log, error)
    }

    fun trace(log: String) {
        logger.trace(log)
    }

    fun warn(log: String) {
        logger.warn(log)
    }
}
