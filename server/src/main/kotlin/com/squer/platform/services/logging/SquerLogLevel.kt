package com.squer.platform.services.logging

import ch.qos.logback.classic.Level

enum class SquerLogLevel constructor(levelName: String){
    INFO("info"),
    DEBUG("debug"),
    ERROR("error"),
    TRACE("trace"),
    WARN("warn");

    val levelName = levelName
    fun getLevel(): Level {
        when (levelName) {
            "info" -> return Level.INFO
            "debug" -> return Level.DEBUG
            "error" -> return Level.ERROR
            "trace" -> return Level.TRACE
            "warn" -> return Level.WARN
            else -> return Level.ALL
        }
    }


    companion object {
        fun get(level: Level): SquerLogLevel {
            when (level) {
                Level.INFO -> return INFO
                Level.DEBUG -> return DEBUG
                Level.ERROR -> return ERROR
                Level.TRACE -> return TRACE
                Level.WARN -> return WARN
                else -> return WARN
            }
        }
    }

}