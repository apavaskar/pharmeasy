package com.squer.platform.services.exception

enum class GenericExceptionCode (private val code: String): ExceptionCode {
    UNKNOWN_EXCEPTION("00001");

    override fun getCode(): String {
        return code;
    }

}