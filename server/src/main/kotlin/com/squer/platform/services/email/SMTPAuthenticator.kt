package com.squer.platform.services.email

import javax.mail.Authenticator
import javax.mail.PasswordAuthentication

class SMTPAuthenticator (var userName: String,var password: String) : Authenticator() {
    public override fun getPasswordAuthentication(): PasswordAuthentication? {
        try {
            return PasswordAuthentication(this.userName,this.password)
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return null
    }
}