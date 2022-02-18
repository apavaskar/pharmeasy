package com.squer.platform.business.entity

import com.squer.platform.persistence.dao.StoreType
import com.squer.platform.services.caches.CacheDef
import com.squer.platform.services.caches.CacheType
import com.squer.platform.services.caches.Cacheable
import org.springframework.cache.annotation.CacheConfig
import kotlin.reflect.KClass

@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
annotation class EntityMeta(val prefix: String,
                            val store: StoreType = StoreType.Rdbms,
                            val tenantAware: Boolean = true,
                            val tableName: String,
                            val model: String = "baseModel")

@CacheDef(CacheType.Remote)
class EntityMetaCache(): Cacheable {

    lateinit var prefix: String
    lateinit var  tableName: String
    lateinit var clazzName: String

    constructor(prefix: String, tableName: String, clazz: KClass<out SquerEntity>) : this() {
        this.prefix = prefix
        this.tableName = tableName
        this.clazzName = clazz.qualifiedName!!
    }

    override fun key(): String {
        return prefix
    }
}
