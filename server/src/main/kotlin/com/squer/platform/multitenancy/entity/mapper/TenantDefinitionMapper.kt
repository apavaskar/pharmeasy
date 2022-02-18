package com.squer.platform.multitenancy.entity.mapper

import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.multitenancy.entity.TenantDefinition
import com.squer.platform.persistence.dao.SquerDbMapper
import com.squer.platform.persistence.dao.StoreType
import org.springframework.stereotype.Component
import kotlin.reflect.KClass

@Component("tenatMapper")
class TenantDefinitionMapper: SquerDbMapper {

    override fun getMappedClass(): KClass<TenantDefinition> = TenantDefinition::class

    override fun getStoreType(): StoreType {
        return StoreType.Rdbms
    }
}