package com.squer.platform.client.security

import com.squer.platform.security.RestAuthInterceptor
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration

import org.springframework.web.servlet.config.annotation.InterceptorRegistry

import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
class RestConfig : WebMvcConfigurer {

    @Autowired
    lateinit var restAuthInterceptor: RestAuthInterceptor

    @Autowired
    lateinit var apiLogger: ApiLogger

    override fun addInterceptors(registry: InterceptorRegistry) {
        registry.addInterceptor(restAuthInterceptor)
        registry.addInterceptor(apiLogger)
    }
}
