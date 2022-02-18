package com.squer.platform.multitenancy.service

import com.squer.platform.business.entity.SquerId
import com.squer.platform.multitenancy.entity.TenantDefinition
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.caches.Cacheable
import com.squer.platform.services.caches.SquerCacheManager
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.sql.Connection
import java.sql.DriverManager

@Service
class TenantService {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var cacheManager: SquerCacheManager

    @Value("\${spring.datasource.url}")
    lateinit var url: String

    @Value("\${spring.datasource.username}")
    lateinit var username: String

    @Value("\${spring.datasource.password}")
    lateinit var password: String

    companion object{
        var tenantCacheMap = mutableMapOf<String, TenantDefinition>()
    }

    fun getTenantDefinition(id: String): TenantDefinition? {
        //var definition = cacheManager.get(id, TenantDefinition::class.java)
        var definition = tenantCacheMap.get(id)
            if (definition == null) {
                loadTenantDefinitions()
                definition = tenantCacheMap.get(id)
            }
        return definition as TenantDefinition
    }

    private fun loadTenantDefinitions() {
        var connection: Connection? = null;
        try {
            connection = DriverManager.getConnection(url, username, password)
            val statement = connection.prepareStatement("SELECT * from FMK_TENANT_DEFINITION where VALID_UPTO is null")
            val result = statement.executeQuery()
            while (result.next()) {
                var tenant = TenantDefinition()
                tenant.id = SquerId(id = result.getString("id"))
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
                tenantCacheMap.put(tenant.id!!.id, tenant)
            }

        } catch (e: Exception) {
            e.printStackTrace()
        } finally {
            if (connection != null && !connection.isClosed()) connection.close()
        }
    }
}