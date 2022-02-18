package com.squer.platform.persistence.dao

import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SearchCriteria
import kotlin.reflect.KClass

interface  SquerDbMapper {

    fun getMappedClass(): KClass<out SquerEntity>

    fun getStoreType(): StoreType
}
