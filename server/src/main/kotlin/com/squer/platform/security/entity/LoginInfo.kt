package com.squer.platform.security.entity

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.dao.SquerDbMapper
import com.squer.platform.persistence.dao.StoreType
import org.springframework.stereotype.Component
import java.util.*
import kotlin.reflect.KClass


@EntityMeta(prefix = "logif", tableName = "FMK_LOGIN_HISTORY")
class LoginInfo: SquerEntity() {
    lateinit var userId: SquerId
    lateinit var firstLoginTime: Date
    lateinit var lastAccessTime: Date
    lateinit var actionTaken: String
}

@Component("logifMapper")
class LoginInfoMapper: SquerDbMapper {
    override fun getMappedClass(): KClass<out SquerEntity> {
        return LoginInfo::class
    }

    override fun getStoreType(): StoreType {
        return StoreType.Rdbms
    }
}