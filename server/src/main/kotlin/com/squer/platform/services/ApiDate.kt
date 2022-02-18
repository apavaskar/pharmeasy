package com.squer.platform.services

import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.*


class ApiDate {
    private val serverInputFormat: DateFormat = SimpleDateFormat("yyyy-MM-dd")
    var yyyyMMFormat: DateFormat = SimpleDateFormat("yyyyMM")
    var yyyyMMDDFormat: DateFormat = SimpleDateFormat("yyyyMMdd")
    var date: Date? = null
        private set

    constructor(serverDate: String?) {
        date = serverInputFormat.parse(serverDate)
    }

    constructor(serverDate: Int?) {
        date = yyyyMMDDFormat.parse(serverDate.toString())
    }

    constructor(date: Date?) {
        this.date = date
    }

    val yYY_MM: Int
        get() = yyyyMMFormat.format(date).toInt()
    val yYYY_MM_DD: Int
        get() = yyyyMMDDFormat.format(date).toInt()
}
