package com.squer.platform.security

import com.squer.platform.security.entity.SquerPrincipal
import com.squer.platform.services.decrypt
import com.squer.platform.services.encrpy

class AuthCertificate {
    companion object {
        private val delimiter: String = "!~!"
    }
    lateinit var certificate: String
    lateinit var principal: SquerPrincipal

    constructor(certificate: String) {
        val decryptString = certificate.decrypt()
        this.certificate = certificate
        val components = decryptString.split(delimiter)
        principal = SquerPrincipal(components[0], components[1], components[2], components[3], components[4].toLong())
    }

    constructor(principal: SquerPrincipal) {
        this.principal = principal
        val components = listOf<String>(principal.id, principal.username, principal.displayName, principal.tenantId, principal.validUpto.toString())
        val decryptString = components.joinToString(separator = delimiter)
        this.certificate = decryptString.encrpy()
    }
}