package com.squer.platform.jms

import java.util.*

class MessageWrapper {
    lateinit var key: Map<String, Any>
    var time: Date = Date()
    lateinit var tenantId: String
}