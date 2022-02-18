package com.squer.platform.security

import com.squer.platform.business.entity.AppConfig
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.dao.DbContextHolder
import com.squer.platform.persistence.dao.DbParams
import com.squer.platform.persistence.dao.StoreType
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.security.entity.LoginInfo
import com.squer.platform.security.entity.SecurityUser
import com.squer.platform.security.entity.SquerPrincipal
import com.squer.platform.security.service.LoginInfoService
import com.squer.platform.services.exception.SquerException
import com.squer.platform.services.hash
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.security.core.context.SecurityContextHolder

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken

import org.springframework.security.core.authority.SimpleGrantedAuthority

import java.util.ArrayList

import org.springframework.security.core.GrantedAuthority
import kotlin.jvm.Throws

@Component
class AuthenticationHandler {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var loginInfoService: LoginInfoService

    @Throws(SquerException::class)
    fun authenticateScheduler(tenantId: String): AuthCertificate {
        val principal = SquerPrincipal("users10000000000000000000000000000000", "scheduler", "Scheduler", tenantId, 1L)

        addPrincipatToContext(principal)
        return AuthCertificate(principal)
    }

    @Throws(SquerException::class)
    fun authenticate(username: String, password: String):AuthCertificate {
        if ("admin" == username.toLowerCase()) {
            val criteria = SearchCriteria(AdhocQueryName("appcg_select"))
            val configs = repository.find(criteria) as List<AppConfig>
            if (configs== null || configs.isEmpty() ) throw SquerException(SecurityExceptionCode.INVALID_CREDENTIALS, "Admin password not found", null)
            if (configs[0].adminPassword != password.hash())
                throw SquerException(SecurityExceptionCode.INVALID_CREDENTIALS, "Invalid credentials passed. Please try again", null)
            val principal = SquerPrincipal( "users00000000000000000000000000000000",
                                                "admin",
                                                "Admin",
                                                DbContextHolder.databaseType.tenantId,
                                                1L)
            addPrincipatToContext(principal)
            return AuthCertificate(principal)
        } else {
            DbContextHolder.databaseType = DbParams(DbContextHolder.CONFIG_DB, "")
            val criteria = SearchCriteria(SecurityQueryName.SECURITY_USER_SELECT.query)
            criteria.addCondition("user_name", username)
            criteria.addCondition("user_status", "ACTIVE")
            val users: List<SecurityUser> = repository.find(criteria).filterIsInstance<SecurityUser>()
            if (users == null || users.isEmpty()) throw SquerException(SecurityExceptionCode.INVALID_CREDENTIALS, "Invalid credentials passed")
            if (users[0].password != password.hash())  throw SquerException(SecurityExceptionCode.INVALID_CREDENTIALS, "Invalid credentials passed")

            var tenantCriteria = SearchCriteria(SecurityQueryName.SECURITY_USER_TENANT_SELECT.query)
            tenantCriteria.addCondition("user_id", users[0].id!!.id)
            val userTenant: List<Map<String, String>> = repository.find(tenantCriteria).filterIsInstance<Map<String, String>>()
            val principal = SquerPrincipal( users[0].id!!.id,
                users[0].username!!,
                users[0].username!!,
                userTenant[0].get("tenant_id")!!,
                1L)
            addPrincipatToContext(principal)
            return AuthCertificate(principal)

        }
    }

    fun authenticateWithCertificate(certificate: String?, loginInfo: LoginInfo): SquerPrincipal? {
        DbContextHolder.databaseType = DbParams(DbContextHolder.CONFIG_DB, "")
        val cert = AuthCertificate(certificate!!)
        val principal = cert.principal
        loginInfo.userId = SquerId(principal.id)
        loginInfoService.logInfo(loginInfo)
        addPrincipatToContext(principal)
        return principal
    }

    private fun addPrincipatToContext(principal: SquerPrincipal) {
        val grantedAuths: MutableList<GrantedAuthority> = ArrayList()
        grantedAuths.add(SimpleGrantedAuthority("ROLE_USER"))
        val token = UsernamePasswordAuthenticationToken(principal, grantedAuths)
        SecurityContextHolder.getContext().authentication = token
    }

    @Throws(SquerException::class)
    fun resetUserPassword(username: String):Boolean {
        try{
            authenticate("admin","welcome")
            DbContextHolder.databaseType = DbParams(DbContextHolder.CONFIG_DB, "")
            val criteria = SearchCriteria(SecurityQueryName.SECURITY_USER_SELECT.query)
            criteria.addCondition("user_name", username)
            criteria.addCondition("user_status", "ACTIVE")
            val users: List<SecurityUser> = repository.find(criteria).filterIsInstance<SecurityUser>()
            if (users == null || users.isEmpty()) throw SquerException(SecurityExceptionCode.INVALID_CREDENTIALS, "Invalid User")
            var user = users[0]
            user.password = "welcome".hash().toString()
            repository.update(user)
            return true
        }catch (e: Exception){
            throw e
        }
    }

}