package com.squer.sfe
import com.squer.platform.business.entity.EntityMetaCache
import com.squer.platform.business.entity.EntityUtil
import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.business.entity.SquerId
import com.squer.platform.multitenancy.entity.TenantDefinition
import com.squer.platform.persistence.AdhocQueryNameRegistry
import com.squer.platform.persistence.SquerQuery
import com.squer.platform.services.caches.SquerCacheManager
import org.reflections.Reflections
import org.springframework.beans.factory.InitializingBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.lang.Exception
import java.sql.Connection
import java.sql.DriverManager

@Component
class AppInitializingBean : InitializingBean {

    @Autowired
    lateinit var cacheManager: SquerCacheManager

    @Value("\${spring.datasource.url}")
    lateinit var url: String

    @Value("\${spring.datasource.username}")
    lateinit var username: String

    @Value("\${spring.datasource.password}")
    lateinit var password: String


    override fun afterPropertiesSet() {
        val reflections = Reflections("com.squer")
        val subTypes = reflections.getSubTypesOf(SquerQuery::class.java)
        subTypes.forEach{
            AdhocQueryNameRegistry.addToRegistry(it.kotlin)
        }

        val entities = reflections.getSubTypesOf(SquerEntity::class.java)
        entities.forEach {
            val meta = EntityUtil.getMeta(it.kotlin)
            if (meta == null) {
                println("NO META for ${it.kotlin}")
            } else {
                val metaCache = EntityMetaCache(meta.prefix, meta.tableName, it.kotlin)
                cacheManager.add(metaCache)
            }
        }
        loadTenantDefinitions()

    }

    private fun loadTenantDefinitions() {
        var connection: Connection? = null;
        try {
            connection = DriverManager.getConnection(url, username, password)
            val statement = connection.prepareStatement("SELECT * from FMK_TENANT_DEFINITION where VALID_UPTO is null")
            val result = statement.executeQuery()
            while(result.next()) {
                var tenant = TenantDefinition()
                tenant.id = SquerId(id= result.getString("id"))
                tenant.code = result.getString("tenant_code")
                tenant.name = result.getString("tenat_name")
                tenant.ciName = result.getString("tenat_ci_name")
                tenant.validFrom = result.getDate("valid_from")
                tenant.validUpto = result.getDate("valid_upto")
                tenant.documentUrl = result.getString("document_url")
                tenant.rdbmsUrl = result.getString("rdbms_url")
                tenant.createdBy = result.getString("created_by")
                tenant.createdOn = result.getDate("created_on")
                tenant.updatedBy = result.getString("created_by")
                tenant.updatedOn = result.getDate("created_on")
                tenant.staleId = result.getLong("stale_id")
                cacheManager.add(tenant)
            }

        } catch (e: Exception) {
            e.printStackTrace()
        } finally {
            if (connection!= null && !connection.isClosed()) connection.close()
        }
    }

}
