package com.squer.platform.security.entity.mapper

import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.persistence.dao.SquerDbMapper
import com.squer.platform.persistence.dao.StoreType
import com.squer.platform.security.entity.SecurityUser
import com.squer.platform.security.entity.UserTenant
import org.springframework.stereotype.Component
import kotlin.reflect.KClass

@Component("utentMapper")
class UserTenantMapper: SquerDbMapper {

    override fun getMappedClass(): KClass<out SquerEntity> {
        return UserTenant::class
    }

    override fun getStoreType(): StoreType {
        return StoreType.Rdbms
    }

}