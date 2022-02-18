package com.squer.scheduledJob.custom.wockhardt.service

import org.springframework.stereotype.Component

interface ScheduledJobImpl {
    fun start(parameterMap: MutableMap<String,Any>)
    fun end(parameterMap: MutableMap<String,Any>)
    fun error(parameterMap: MutableMap<String,Any>)
}