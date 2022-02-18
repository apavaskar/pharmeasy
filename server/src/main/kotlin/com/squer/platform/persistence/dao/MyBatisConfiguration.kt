package com.squer.platform.persistence.dao

import com.fasterxml.jackson.databind.util.Named
import com.squer.platform.SpringContextUtil
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.PersistenceLoggerName
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.caches.SquerCacheManager
import com.squer.platform.services.logging.SquerLogger
import com.squer.platform.services.properties.ConfigProperties
import org.apache.ibatis.session.SqlSessionFactory
import org.apache.ibatis.type.JdbcType
import org.apache.ibatis.type.MappedTypes
import org.apache.ibatis.type.TypeHandler
import org.mybatis.spring.SqlSessionFactoryBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.support.PathMatchingResourcePatternResolver
import java.sql.CallableStatement
import java.sql.PreparedStatement
import java.sql.ResultSet
import java.sql.SQLException
import kotlin.jvm.Throws


@Configuration
class MyBatisConfiguration {

    @Autowired
    lateinit var repository: SquerRepository


    @Autowired
    lateinit var configs: ConfigProperties

    @Autowired
    lateinit var datasource: SquerRoutingDatasource

    companion object {
        val logger = SquerLogger.getLogger(PersistenceLoggerName.DAO)
    }

    @Autowired
    lateinit var cacheManager: SquerCacheManager


    @Bean
    @Throws(Exception::class)
    fun sqlSessionFactory(): SqlSessionFactory? {
        val factoryBean = SqlSessionFactoryBean()
        factoryBean.setDataSource(datasource)
        factoryBean.setMapperLocations(*PathMatchingResourcePatternResolver().getResources("classpath*:/mapper/*.xml"))
        val configuration = org.apache.ibatis.session.Configuration()
        configuration.typeHandlerRegistry.register(NamedSquerIdHandler::class.java)
        configuration.typeHandlerRegistry.register(SquerIdHandler::class.java)
        configuration.isMapUnderscoreToCamelCase = true
        configuration.typeAliasRegistry.registerAlias("SearchCriteria", SearchCriteria::class.java)
        configuration.typeAliasRegistry.registerAlias("DbObject", DbObject::class.java)
        factoryBean.setConfiguration(configuration)
        return factoryBean.getObject()
    }



}

@MappedTypes(*[NamedSquerId::class])
class NamedSquerIdHandler: TypeHandler<NamedSquerId> {

    override fun setParameter(ps: PreparedStatement?, i: Int, parameter: NamedSquerId?, jdbcType: JdbcType?) {
        ps!!.setString(i, parameter?.id)
    }

    override fun getResult(rs: ResultSet?, columnName: String?): NamedSquerId {
        val id = rs?.getString(columnName) ?: return NamedSquerId("","")
        val prefix = id.substring(0,5)
        if(hasColumn(rs,"${prefix}_name")){
            return NamedSquerId(id,rs.getString("${prefix}_name"))
        }
        val repository = SpringContextUtil.getBean(SquerRepository::class.java)
        val nsId = repository.getNamedSquerId(id)
        if(nsId.name == "Unknown"){
            println(columnName)
        }
        return nsId
        //return repository.getNamedSquerId(id)
    }

    override fun getResult(rs: ResultSet?, columnIndex: Int): NamedSquerId {
        TODO("Not yet implemented")
    }

    override fun getResult(cs: CallableStatement?, columnIndex: Int): NamedSquerId {
        TODO("Not yet implemented")
    }

    @Throws(SQLException::class)
    fun hasColumn(rs: ResultSet, columnName: String): Boolean {
        val rsmd = rs.metaData
        val columns = rsmd.columnCount
        for (x in 1..columns) {
            if (columnName == rsmd.getColumnName(x)) {
                return true
            }
        }
        return false
    }
}

@MappedTypes(SquerId::class)
class SquerIdHandler: TypeHandler<SquerId> {

    override fun setParameter(ps: PreparedStatement?, i: Int, parameter: SquerId?, jdbcType: JdbcType?) {
        ps!!.setString(i, parameter?.id)
    }

    override fun getResult(rs: ResultSet?, columnName: String?): SquerId {
        return SquerId(rs?.getString(columnName) ?:"")
    }

    override fun getResult(rs: ResultSet?, columnIndex: Int): SquerId {
        TODO("Not yet implemented")
    }

    override fun getResult(cs: CallableStatement?, columnIndex: Int): SquerId {
        TODO("Not yet implemented")
    }


}