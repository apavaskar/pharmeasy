package com.squer.platform.security

import javax.servlet.http.HttpServletResponse

import javax.servlet.http.HttpServletRequest

import org.springframework.web.servlet.ModelAndView

import com.squer.platform.business.entity.SquerId
import com.squer.platform.client.PlatformClientLoggerName
import com.squer.platform.multitenancy.entity.TenantDefinition
import com.squer.platform.multitenancy.service.TenantService
import com.squer.platform.persistence.dao.DbContextHolder
import com.squer.platform.persistence.dao.DbContextHolder.databaseType
import com.squer.platform.persistence.dao.DbParams
import com.squer.platform.security.entity.LoginInfo
import com.squer.platform.security.service.LoginInfoService
import com.squer.platform.services.caches.SquerCacheManager
import com.squer.platform.services.logging.SquerLogger
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component


import org.springframework.web.servlet.handler.HandlerInterceptorAdapter
import java.lang.Exception
import java.util.*
import kotlin.jvm.Throws


@Component
class RestAuthInterceptor : HandlerInterceptorAdapter() {


    @Autowired
    lateinit var authenticationHandler: AuthenticationHandler

    @Autowired
    lateinit var tenantService: TenantService

    @Autowired
    lateinit var loginInfoService: LoginInfoService

    @Throws(Exception::class)
    override fun preHandle(
        requestServlet: HttpServletRequest,
        responseServlet: HttpServletResponse,
        handler: Any
    ): Boolean {
        val requestUri = requestServlet.requestURI
        if (requestUri.contains("/auth/login") || requestUri.contains("swagger") || requestUri.contains("/mobile/app-version") ||
            requestUri.contains("static") ||
            requestUri.contains("assets") || requestUri.contains(".js") || requestUri.equals("/", ignoreCase = true) ||
            requestUri.contains(".css") || requestUri.contains("/error") || requestUri.contains(".htm") ||
            requestUri.contains(".html") || requestUri.contains("/adhoc/register") || requestUri.contains("api-docs")
            || requestUri.contains("/auth/reset-password")
        ) {
            return true
        }
        val certificate = if (requestServlet.getParameter("AUTH_CERTIFICATE") != null) {
            requestServlet.getParameter("AUTH_CERTIFICATE")
        } else {
            requestServlet.getHeader("AUTH_CERTIFICATE")
        }
        val loginInfo = LoginInfo()
        loginInfo.actionTaken = requestUri
        val principal = authenticationHandler.authenticateWithCertificate(certificate, loginInfo)
        val tenant = tenantService.getTenantDefinition(principal!!.tenantId)
        DbContextHolder.databaseType = DbParams( tenantId =  principal!!.tenantId, tenant!!.code)
        return true
    }

    @Throws(Exception::class)
    override fun postHandle(
        request: HttpServletRequest,
        response: HttpServletResponse,
        handler: Any,
        modelAndView: ModelAndView?
    ) {
        logger.debug("MINIMAL: INTERCEPTOR POSTHANDLE CALLED")
    }

    @Throws(Exception::class)
    override fun afterCompletion(
        request: HttpServletRequest,
        response: HttpServletResponse,
        handler: Any,
        exception: Exception?
    ) {
        logger.debug("MINIMAL: INTERCEPTOR AFTERCOMPLETION CALLED")
    }

    companion object {
        private val urls = arrayOf("/auth/login", "swagger", "/#/")
        val logger = SquerLogger.getLogger(PlatformClientLoggerName.Security)
    }
}