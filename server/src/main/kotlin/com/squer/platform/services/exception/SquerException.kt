package com.squer.platform.services.exception

open class SquerException (val code: ExceptionCode, override val message: String, val root: Throwable? = null) : Exception(root) {

}