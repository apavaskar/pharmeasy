package com.squer.platform.services.caches

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component("squerCacheFactory")
class SquerCacheFactory {

    @Autowired
    lateinit var localCache: LocalCache

    @Autowired
    lateinit var remoteCache: RemoteCache

    fun getCache(cacheType: CacheType): SquerCache {
        when(cacheType) {
            CacheType.Local -> return  localCache
            else -> return  localCache
        }
    }
}