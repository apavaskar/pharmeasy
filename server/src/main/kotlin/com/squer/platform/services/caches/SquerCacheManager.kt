package com.squer.platform.services.caches

import com.squer.platform.services.ServicesLoggerName
import com.squer.platform.services.logging.SquerLogger
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class SquerCacheManager {

    private val logger = SquerLogger.getLogger(ServicesLoggerName.Cache)

    @Autowired
    lateinit var squerCacheFactory: SquerCacheFactory

    fun add(cacheable: Cacheable) {
        logger.trace("Adding to cache: ${cacheable.key()}")
        val cacheDef = cacheable.javaClass.getAnnotation(CacheDef::class.java)
        val cache = squerCacheFactory.getCache(cacheDef.type)
        cache.add(cacheable)
    }

    fun get(key: String, clazz: Class<out Cacheable>): Cacheable? {
        logger.trace("Getting from Cache: $key")
        val cacheDef = clazz.getAnnotation(CacheDef::class.java)
        val cache = squerCacheFactory.getCache(cacheDef.type)
        return cache.get(key, clazz)
    }
}

