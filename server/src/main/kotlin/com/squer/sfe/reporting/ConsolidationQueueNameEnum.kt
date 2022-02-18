package com.squer.sfe.reporting

import com.squer.platform.jms.QueueName

enum class ConsolidationQueueNameEnum(override val queueName: String): QueueName {
    EffortConsolidationQueue("effortConsolidationQueue")
}