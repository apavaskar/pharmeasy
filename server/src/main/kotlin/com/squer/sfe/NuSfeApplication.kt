package com.squer.sfe

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.jms.DefaultJmsListenerContainerFactoryConfigurer
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.context.annotation.Bean
import org.springframework.jms.annotation.EnableJms
import org.springframework.jms.config.DefaultJmsListenerContainerFactory
import org.springframework.jms.config.JmsListenerContainerFactory
import org.springframework.jms.support.converter.MappingJackson2MessageConverter
import org.springframework.jms.support.converter.MessageConverter
import org.springframework.jms.support.converter.MessageType
import org.springframework.scheduling.annotation.EnableScheduling
import javax.jms.ConnectionFactory


@SpringBootApplication(exclude = [(SecurityAutoConfiguration::class)])
@ConfigurationPropertiesScan(basePackages = ["com.squer"])
@ComponentScan(basePackages = ["com.squer"])
@EnableScheduling
class NuSfeApplication {
	companion object {
		@JvmStatic
		fun main(args: Array<String>) {
			runApplication<NuSfeApplication>(*args)
		}
	}

}

