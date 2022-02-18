package com.squer.platform.persistence.dao

import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.persistence.SearchCriteria

interface SquerDao {

    fun insert(mapper: SquerDbMapper, entity: SquerEntity)

    fun update(mapper: SquerDbMapper, entity: SquerEntity): Int

    fun select(mapper: SquerDbMapper, id: String): SquerEntity

    fun select(criteria: SearchCriteria): List<Any>

    fun delete(mapper: SquerDbMapper, entity: SquerEntity): Int

    fun insertAdhoc(queryName: String, row: MutableMap<String, Any>)

    fun updateAdhoc(queryName: String, row: MutableMap<String, Any>)

    fun deleteAdhoc(queryName: String, row: MutableMap<String, Any>)
}