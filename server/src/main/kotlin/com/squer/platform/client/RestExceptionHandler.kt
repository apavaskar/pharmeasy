package com.squer.platform.client

import com.squer.platform.services.exception.ExceptionCode
import com.squer.platform.services.exception.GenericExceptionCode
import com.squer.platform.services.exception.SquerException
import org.springframework.http.HttpStatus

import org.springframework.http.ResponseEntity

import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import java.lang.Exception


@ControllerAdvice
class RestExceptionHandler {

    @ExceptionHandler(Exception::class)
    fun handleGenericException(e: Exception): ResponseEntity<SquerException> {
        e.printStackTrace()
        val squerException = SquerException(GenericExceptionCode.UNKNOWN_EXCEPTION, e.message!!, null)
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body<SquerException>(squerException)
    }

    @ExceptionHandler(SquerException::class)
    fun handleSquerException(e: SquerException): ResponseEntity<SquerException> {
        e.printStackTrace()
        val squerException = SquerException(GenericExceptionCode.UNKNOWN_EXCEPTION, e.message!!, null)
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body<SquerException>(squerException)
    }
}