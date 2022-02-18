package com.squer.platform.services.caches

interface SquerCache {
    fun add(cacheable: Cacheable)

    fun get(key: String, cacheable: Class<out Cacheable>): Cacheable?

    fun remove(key: String)
}