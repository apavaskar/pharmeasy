package com.squer.sfe.cache

import com.squer.platform.services.caches.CacheDef
import com.squer.platform.services.caches.CacheType
import com.squer.platform.services.caches.Cacheable
import com.squer.platform.services.caches.SquerCacheManager
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test

class CacheManagerTest {

    @Test
    fun testCache() {
        SquerCacheManager.add(TestCacheable())
        val test = SquerCacheManager.get("TEST", CacheType.Local)
        assertNotNull(test)
    }


}

@CacheDef(CacheType.Local)
class TestCacheable: Cacheable {
    override fun key(): String {
        return "TEST"
    }
}