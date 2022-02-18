package com.squer.platform.client.controller

import com.squer.platform.business.entity.SquerId
import com.squer.platform.multitenancy.entity.TenantDefinition
import com.squer.platform.persistence.dao.DbContextHolder
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.security.AuthCertificate
import com.squer.platform.security.AuthenticationHandler
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.util.*
import kotlin.jvm.Throws

@RequestMapping("/auth")
@RestController
class AuthenticationController {


    @Autowired
    lateinit var authHandler: AuthenticationHandler

    @PostMapping("/login")
    @Throws(SquerException::class)
    fun authenticate(@RequestBody loginDTO: LoginDTO): AuthCertificate {
        return authHandler.authenticate(loginDTO.username.toUpperCase(), loginDTO.password)
    }

    @GetMapping("/reset-password/{userName}")
    @Throws(SquerException::class)
    fun resetPassword(@PathVariable userName: String): Boolean {
        return authHandler.resetUserPassword(userName)
    }
}


data class LoginDTO(val username: String, val password: String)