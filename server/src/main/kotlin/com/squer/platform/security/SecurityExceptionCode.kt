package com.squer.platform.security

import com.squer.platform.services.exception.ExceptionCode

enum class SecurityExceptionCode(private val code: String): ExceptionCode {
    INVALID_CREDENTIALS("200001"),
    USER_ALREADY_EXISTS ("200002"),
    INVALID_USER ("200003"),
    PLAN_IS_NOT_CREATED ("200004");

    override fun getCode(): String {
        return code
    }

}