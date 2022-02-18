package com.squer.platform.jms

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jms.core.JmsTemplate
import org.springframework.stereotype.Service

@Service
class MessagePublisher {

    @Autowired
    lateinit var jmsTemplate: JmsTemplate

    fun send(queueName: QueueName, message: MessageWrapper ) {
        println("Sending a transaction.")
        jmsTemplate.convertAndSend(queueName.queueName, message)
    }
}