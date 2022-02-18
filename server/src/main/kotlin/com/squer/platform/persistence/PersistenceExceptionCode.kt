package com.squer.platform.persistence

import com.squer.platform.services.exception.ExceptionCode

enum class PersistenceExceptionCode (private val code: String): ExceptionCode {
    INVALID_CONFIG("10001"),
    DUPLICATE_KEY("10000");

    override fun getCode(): String {
        return code;
    }

}