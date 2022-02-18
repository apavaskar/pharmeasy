package com.squer.platform.services.properties

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding
@ConstructorBinding
@ConfigurationProperties(prefix="application.config")
data class ConfigProperties(val path: String, val multitenant: Boolean)

@ConstructorBinding
@ConfigurationProperties(prefix="application.configdatasource")
data class ConfigDbProperties(val host: String, val port: Int, val db: String )

@ConstructorBinding
@ConfigurationProperties(prefix="application.cache.remote")
data class RemoteCacheConfig(val host: String, val port: Int, val timeout: Int)