package com.squer.platform.services.caches

@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
annotation class CacheDef(val type: CacheType)
