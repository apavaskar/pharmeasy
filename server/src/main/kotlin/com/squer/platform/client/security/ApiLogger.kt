package com.squer.platform.client.security

import com.squer.platform.client.PlatformClientLoggerName
import com.squer.platform.persistence.dao.DbContextHolder
import com.squer.platform.persistence.dao.MyBatisConfiguration.Companion.logger
import com.squer.platform.services.logging.SquerLogger
import org.springframework.stereotype.Component
import javax.servlet.http.HttpServletResponse

import javax.servlet.http.HttpServletRequest

import java.util.UUID

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter
import java.lang.Exception

@Component
class ApiLogger : HandlerInterceptorAdapter() {
    @Throws(Exception::class)
    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {
        val requestId = UUID.randomUUID().toString()
        //log(request, response, requestId)
        val startTime = System.currentTimeMillis()
        request.setAttribute("startTime", startTime)
        request.setAttribute("requestId", requestId)
        return true
    }

    @Throws(Exception::class)
    override fun afterCompletion(
        request: HttpServletRequest,
        response: HttpServletResponse,
        handler: Any,
        ex: Exception?
    ) {
        super.afterCompletion(request, response, handler, ex)
        val startTime = request.getAttribute("startTime") as Long
        val endTime = System.currentTimeMillis()
        val executeTime = endTime - startTime
        logger.debug("===================================================")
        logger.debug(
            "requestId ${request.getAttribute("requestId")}, Handle : ${handler} , request take time: ${executeTime}")
        logger.debug("===================================================")
    }

   /* private fun log(request: HttpServletRequest, response: HttpServletResponse, requestId: String) {
        logger.debug(
            "requestId {}, host {}  HttpMethod: {}, URI : {}", requestId, request.getHeader("host"),
            request.method, request.requestURI
        )
    }*/

    companion object {
        private val logger: SquerLogger =
            SquerLogger.getLogger(PlatformClientLoggerName.Controller)
    }
}