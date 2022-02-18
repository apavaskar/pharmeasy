package com.squer.platform.persistence.dao

import com.mchange.v2.c3p0.ComboPooledDataSource
import com.squer.platform.business.entity.SquerId
import com.squer.platform.multitenancy.entity.TenantDefinition
import com.squer.platform.multitenancy.service.TenantService
import com.squer.platform.persistence.PersistenceLoggerName
import com.squer.platform.services.caches.SquerCacheManager
import com.squer.platform.services.logging.SquerLogger
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import java.util.HashMap

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource
import org.springframework.stereotype.Component
import java.lang.Exception
import java.sql.Connection
import java.sql.DriverManager
import javax.sql.DataSource


@Component
class SquerRoutingDatasource : AbstractRoutingDataSource() {

    @Autowired
    lateinit var cacheManager: SquerCacheManager

    @Value("\${spring.datasource.username}")
    lateinit var username: String

    @Value("\${spring.datasource.password}")
    lateinit var password: String

    @Autowired
    lateinit var tenantService: TenantService


    companion object {
        val logger = SquerLogger.getLogger(PersistenceLoggerName.DAO)
        val mapOfDatasource = mutableMapOf<String, DataSource>()
    }

    override fun determineCurrentLookupKey(): Any? {
        return DbContextHolder.databaseType.tenantId
    }


    override fun determineTargetDataSource(): DataSource {
        val key = determineCurrentLookupKey()!!
        if (!mapOfDatasource.containsKey(key)) generateMap(key as String)
        val tenantDefinition =  getTenantDefinition(DbContextHolder.databaseType.tenantId)//cacheManager.get(DbContextHolder.databaseType.tenantId, TenantDefinition::class.java) as TenantDefinition
        return mapOfDatasource.get(tenantDefinition.id!!.id)!!
    }


    private fun generateMap(id: String) {
        if (mapOfDatasource.containsKey(id)) return
        val tenant =  getTenantDefinition(id)//cacheManager.get(id, TenantDefinition::class.java) as TenantDefinition
        val cpds = ComboPooledDataSource()
        cpds.jdbcUrl = tenant.rdbmsUrl
        cpds.user = username
        cpds.password = password
        cpds.initialPoolSize = 2
        cpds.minPoolSize = 2
        cpds.acquireIncrement = 1
        cpds.maxPoolSize = 10
        cpds.maxStatements = 100
        cpds.isTestConnectionOnCheckout = true
        cpds.isTestConnectionOnCheckin = true
        mapOfDatasource[tenant.id!!.id] = cpds
    }

    override fun afterPropertiesSet() {
        setTargetDataSources(mutableMapOf())
        super.afterPropertiesSet()
    }

    fun getTenantDefinition(tenantId: String): TenantDefinition {
        return tenantService.getTenantDefinition(tenantId)!!
    }
}

