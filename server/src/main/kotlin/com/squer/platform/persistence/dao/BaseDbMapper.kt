package com.squer.platform.persistence.dao

import com.squer.platform.business.entity.EntityMetaCache
import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.services.caches.SquerCacheManager
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import kotlin.reflect.KClass

@Component("baseDbMapper")
class BaseDbMapper: SquerDbMapper {
    @Autowired
    lateinit var squerCacheManager: SquerCacheManager
    var prefix: String = ""

    override fun getMappedClass(): KClass<out SquerEntity> {
        if (prefix == "")
            throw RuntimeException("Did you forget to set the prefix.")
        val meta = squerCacheManager.get(prefix, EntityMetaCache::class.java) as EntityMetaCache
        return Class.forName(meta.clazzName).kotlin as KClass<out SquerEntity>
    }

    override fun getStoreType(): StoreType {
        return StoreType.Rdbms
    }
}
