package com.squer.platform

import com.squer.platform.security.entity.SquerPrincipal
import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationContextAware

import org.springframework.security.authentication.AnonymousAuthenticationToken
import org.springframework.security.core.Authentication

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component

@Component
class ServiceLocator{

    fun getPrincipal(): SquerPrincipal? {
        val auth: Authentication? = SecurityContextHolder.getContext().authentication
        if (auth != null && auth is AnonymousAuthenticationToken) return null
        return if (auth != null) {
            auth.getPrincipal() as SquerPrincipal
        } else null
    }

}


@Component
class SpringContextUtil: ApplicationContextAware {

    companion object {
        lateinit var applicationContext: ApplicationContext
        fun <T> getBean(bean: Class<T>): T {
            return applicationContext.getBean(bean)
        }
    }

    override fun setApplicationContext(applicationContext: ApplicationContext) {
        SpringContextUtil.applicationContext = applicationContext
    }

}


