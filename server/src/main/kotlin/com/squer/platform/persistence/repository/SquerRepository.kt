package com.squer.platform.persistence.repository

import com.squer.consolidation.ConsolidationQueryName
import com.squer.platform.ServiceLocator
import com.squer.platform.business.entity.*
import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.PersistenceQueryName
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.dao.DbContextHolder
import com.squer.platform.persistence.dao.SquerDbMapper
import com.squer.platform.services.caches.SquerCacheManager
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationContext
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import kotlin.jvm.Throws
import kotlin.reflect.KClass

@Component("squerRepository")
class SquerRepository {


    @Autowired
    lateinit var appContext: ApplicationContext

    @Autowired
    lateinit var serviceLocator: ServiceLocator

    @Autowired
    lateinit var cacheManager: SquerCacheManager


    @Throws(SquerException::class)
    @Transactional(propagation = Propagation.REQUIRED)
    fun create(entity: SquerEntity): SquerEntity {
        val meta = EntityUtil.getMeta(entity)
        val model = getModel(meta)
        EntityUtil.fillEntityForCreate(entity, meta, serviceLocator.getPrincipal())
        val entitySaved = model.postCreate(model.create(model.preCreate(entity, meta), meta), meta)
        return entitySaved
    }

    @Throws(SquerException::class)
    @Transactional(propagation = Propagation.REQUIRED)
    fun update(entity: SquerEntity): SquerEntity {
        val meta = EntityUtil.getMeta(entity)
        val model = getModel(meta)
        EntityUtil.fillEntityForUpdate(entity, meta, serviceLocator.getPrincipal())
        val entitySaved = model.postUpdate(model.update(model.preUpdate(entity, meta), meta), meta)
        return entitySaved
    }

    @Throws(SquerException::class)
    @Transactional(propagation = Propagation.REQUIRED)
    fun delete(entity: SquerEntity): Boolean {
        val meta = EntityUtil.getMeta(entity)
        val model = getModel(meta)
        return model.delete(entity, meta)
    }


    @Throws(SquerException::class)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    fun updateAndCommit(entity: SquerEntity): SquerEntity {
        val meta = EntityUtil.getMeta(entity)
        val model = getModel(meta)
        EntityUtil.fillEntityForUpdate(entity, meta, serviceLocator.getPrincipal()!!)
        val entitySaved = model.postUpdate(model.update(model.preUpdate(entity, meta), meta), meta)
        return entitySaved
    }


    @Throws(SquerException::class)
    fun restore(id: SquerId) : SquerEntity? {
        val prefix = id.getPrefix()
        //val mapper = //appContext.getBean("${prefix}Mapper") as SquerDbMapper
        val metaCache = cacheManager.get(prefix, EntityMetaCache::class.java)!! as EntityMetaCache
        val meta =  EntityUtil.getMeta(Class.forName(metaCache.clazzName).kotlin as KClass<out SquerEntity>)
        val model = getModel(meta)
        return model.postRestore(model.restore(model.preRestore(id, meta), meta), meta)
    }




    @Throws(SquerException::class)
    fun getNamedSquerId(id: String): NamedSquerId {
        try {
            var nameSquerID = getNamedSquerIdFromCache(id)
            if(nameSquerID !=null) {
                return nameSquerID
            }

            val prefix = id.substring(0, 5)
            val meta = cacheManager.get(prefix, EntityMetaCache::class.java) as EntityMetaCache
            val criteria = SearchCriteria(PersistenceQueryName.NAMED_ID_SELECT.query)
            criteria.addCondition("id", id)
            criteria.addCondition("id_column","${prefix.toLowerCase()}_id")
            criteria.addCondition("table_name", meta.tableName)
            criteria.addCondition("name_column", "${meta.prefix}_name")
            val result = find(criteria).filterIsInstance<Map<String, String>>().first()
            nameSquerID =  NamedSquerId(result.get("id")!!, result.get("name")!!)
            cacheManager.add(nameSquerID)
            return  nameSquerID
        }catch (e:Exception) {
            println("=================================")
            println("ID NOT FOUND ==" + id)
            println("=================================")
            return NamedSquerId(id,"Unknown")
        }
    }

    @Throws(SquerException::class)
    fun find(criteria: SearchCriteria): List<Any> {
        val model = appContext.getBean("baseModel") as SquerBaseModel
        return model.find(criteria)
    }

    @Throws(SquerException::class)
    fun fireAdhoc(query: AdhocQueryName, row: MutableMap<String, Any> ): Int {
        val model = appContext.getBean("baseModel") as SquerBaseModel
        row.put("schemaName", DbContextHolder.databaseType.schemaName)
        return model.fireAdhoc(query, row)
    }

    fun getModel(meta: EntityMeta) = appContext.getBean(meta.model) as SquerBaseModel

    fun getNamedSquerIdFromCache(id: String) : NamedSquerId?{
        return cacheManager.get(id,NamedSquerId::class.java) as NamedSquerId?
    }
}