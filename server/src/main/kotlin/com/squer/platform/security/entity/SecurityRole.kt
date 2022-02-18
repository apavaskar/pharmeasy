package com.squer.platform.security.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.persistence.dao.SquerDbMapper
import com.squer.platform.persistence.dao.StoreType
import org.springframework.stereotype.Component
import kotlin.reflect.KClass

@EntityMeta(prefix = "srole", model = "SecurityRoleModel", tableName = "FMK_SECURITY_ROLE")
class SecurityRole: AbstractStandardEntity() {
    val privileges: ArrayList<SecurityPrivilege> = ArrayList()
}

@Component("sroleMapper")
class SecurityRoleMapper: SquerDbMapper {

    override fun getMappedClass(): KClass<out SquerEntity> {
        return SecurityRole::class
    }

    override fun getStoreType(): StoreType {
        return StoreType.Rdbms
    }

}