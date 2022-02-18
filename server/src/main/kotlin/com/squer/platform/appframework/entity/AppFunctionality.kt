package com.squer.platform.appframework.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.persistence.dao.SquerDbMapper
import com.squer.platform.persistence.dao.StoreType
import org.springframework.stereotype.Component
import kotlin.reflect.KClass

//@EntityMeta(prefix = "appfr")
class AppFunctionality: AbstractStandardEntity() {
    var on: Boolean = false
}

@Component("appfrMapper")
class AppFunctionalityMapper: SquerDbMapper {

    override fun getMappedClass(): KClass<out SquerEntity> {
        return AppFunctionality::class
    }

    override fun getStoreType(): StoreType {
        return StoreType.Rdbms
    }

}