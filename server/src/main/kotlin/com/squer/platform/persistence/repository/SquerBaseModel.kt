package com.squer.platform.persistence.repository

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.dao.*
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationContext
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import kotlin.jvm.Throws

@Component("baseModel")
@Transactional
open class SquerBaseModel {

    @Autowired
    lateinit var documentDao: DocumentDao

    @Autowired
    lateinit var sqlDao: SqlDao

    @Autowired
    lateinit var applicationContext: ApplicationContext

    @Throws(SquerException::class)
    fun preCreate(entity: SquerEntity, meta: EntityMeta): SquerEntity {
        return entity
    }

    @Throws(SquerException::class)
    fun create(entity: SquerEntity, meta: EntityMeta): SquerEntity {
        val dao = getDao(meta)
        dao.insert(getMapper(meta), entity)
        return entity
    }

    @Throws(SquerException::class)
    fun postCreate(entity: SquerEntity, meta: EntityMeta): SquerEntity {
        return entity
    }

    @Throws(SquerException::class)
    fun preUpdate(entity: SquerEntity, meta: EntityMeta): SquerEntity {
        return entity
    }

    @Throws(SquerException::class)
    fun update(entity: SquerEntity, meta: EntityMeta): SquerEntity {
        val dao = getDao(meta)
        dao.update(getMapper(meta), entity)
        return entity
    }

    @Throws(SquerException::class)
    fun delete(entity: SquerEntity, meta: EntityMeta): Boolean {
        val dao = getDao(meta)
        dao.delete(getMapper(meta), entity)
        return true
    }

    @Throws(SquerException::class)
    fun postUpdate(entity: SquerEntity, meta: EntityMeta): SquerEntity {
        return entity
    }

    @Throws(SquerException::class)
    fun preRestore(id: SquerId, meta: EntityMeta): SquerId {
        return id
    }

    @Throws(SquerException::class)
    fun restore(id: SquerId, meta: EntityMeta): SquerEntity {
        val dao = getDao(meta)
        return dao.select(getMapper(meta), id.id)
    }

    @Throws(SquerException::class)
    fun postRestore(entity: SquerEntity, meta: EntityMeta): SquerEntity {
        return entity
    }

    @Throws(SquerException::class)
    fun find(criteria: SearchCriteria): List<Any> {
        val type = criteria.query.store
        val dao = if(type == StoreType.Document) documentDao else sqlDao
        return dao.select(criteria)
    }

    @Throws(SquerException::class)
    fun fireAdhoc(query: AdhocQueryName,row: MutableMap<String, Any> ): Int {
        val type = query.store
        val dao = if(type == StoreType.Document) documentDao else sqlDao
        if (query.name.indexOf("_insert") > 0) {
            dao.insertAdhoc(query.name, row)
            return  1
        } else if (query.name.indexOf("_update") > 0) {
            dao.updateAdhoc(query.name, row)
            return 1
        } else if (query.name.indexOf("_delete") > 0) {
            dao.deleteAdhoc(query.name, row)
            return 1
        }  else return 0
    }



    private fun getDao(meta: EntityMeta) : SquerDao = if(meta.store == StoreType.Document) documentDao else sqlDao

    fun getMapper(meta: EntityMeta) = if (applicationContext.containsBean("${meta.prefix}Mapper")) applicationContext.getBean("${meta.prefix}Mapper") as SquerDbMapper
    else getBaseMapper(meta.prefix)

    fun getBaseMapper(prefix: String): SquerDbMapper {
        var mapper = applicationContext.getBean("baseDbMapper") as BaseDbMapper
        mapper.prefix = prefix
        return mapper
    }

}