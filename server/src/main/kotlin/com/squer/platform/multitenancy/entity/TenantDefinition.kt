package com.squer.platform.multitenancy.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.persistence.dao.StoreType
import com.squer.platform.services.caches.CacheDef
import com.squer.platform.services.caches.CacheType
import com.squer.platform.services.caches.Cacheable
import java.util.*


@EntityMeta(prefix = "tenat", tenantAware = false, tableName = "FMK_TENANT_DEFINITION")
@CacheDef(type = CacheType.Local)
class TenantDefinition: AbstractStandardEntity(), Cacheable {
    var validFrom: Date = Date()
    var code: String = ""
    var validUpto: Date? = null
    var documentUrl: String = ""
    var rdbmsUrl: String = ""

    override fun key(): String {
        return id!!.id
    }
}

