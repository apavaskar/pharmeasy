package com.squer.sfe

import com.squer.platform.services.exception.ExceptionCode

enum class SfeExceptionCode(private val code: String): ExceptionCode {
    VISIT_ALREADY_EXISTS("500001"),
    UNLOCK_REQUEST_EXISTS("500002")
    ;
    override fun getCode(): String {
        return code
    }
}