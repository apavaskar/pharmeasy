package com.squer.platform.persistence.dao

import com.squer.platform.business.entity.EntityUtil
import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SearchCriteria
import org.apache.ibatis.session.SqlSessionFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class SqlDao: SquerDao {

    @Autowired
    lateinit var sqlSessionFactory: SqlSessionFactory

    override fun insert(mapper: SquerDbMapper, entity: SquerEntity) {
        val meta = EntityUtil.getMeta(entity)
        sqlSessionFactory.openSession().insert("${meta.prefix}_insert", DbObject(schemaName = DbContextHolder.databaseType.schemaName, entity = entity))
    }

    override fun update(mapper: SquerDbMapper, entity: SquerEntity): Int {
        val meta = EntityUtil.getMeta(entity)
        return sqlSessionFactory.openSession().update("${meta.prefix}_update", DbObject(schemaName = DbContextHolder.databaseType.schemaName, entity = entity))
    }

    override fun delete(mapper: SquerDbMapper, entity: SquerEntity): Int {
        val meta = EntityUtil.getMeta(entity)
        return sqlSessionFactory.openSession().delete("${meta.prefix}_delete", DbObject(schemaName = DbContextHolder.databaseType.schemaName, entity = entity))
    }

    override fun select(mapper: SquerDbMapper, id: String): SquerEntity {
        val criteria = SearchCriteria(AdhocQueryName(name = "${id.substring(0,5)}_select", store = mapper.getStoreType()))
        criteria.schemaName = DbContextHolder.databaseType.schemaName
        criteria.addCondition("${id.substring(0,5)}_id",id)
        return sqlSessionFactory.openSession().selectOne(criteria.query.name, criteria)
    }

    override fun select(criteria: SearchCriteria): List<Any> {

        criteria.schemaName = DbContextHolder.databaseType.schemaName
        return sqlSessionFactory.openSession().selectList<Any>(criteria.query.name, criteria)
    }


    override fun insertAdhoc(queryName: String, row: MutableMap<String, Any>) {
        row["schemaName"] = DbContextHolder.databaseType.schemaName
        sqlSessionFactory.openSession().insert(queryName, row)
    }

    override fun updateAdhoc(queryName: String, row: MutableMap<String, Any>) {
        sqlSessionFactory.openSession().update(queryName, row)
    }

    override fun deleteAdhoc(queryName: String, row: MutableMap<String, Any>) {
        sqlSessionFactory.openSession().delete(queryName, row)
    }

}

data class DbObject(val schemaName: String, val entity: SquerEntity)