package com.squer.platform.persistence

import com.squer.platform.persistence.dao.StoreType
import com.squer.platform.services.logging.SquerLogger
import kotlin.reflect.KClass

data class AdhocQueryName(val name: String, val store: StoreType = StoreType.Rdbms, val orderByList: List<String> = ArrayList<String>())

class AdhocQueryNameRegistry {

    companion object {
        val map: MutableMap<String, AdhocQueryName> = mutableMapOf()

        val logger = SquerLogger.getLogger(PersistenceLoggerName.AdhocQuery)

        fun addToRegistry(query: KClass<out SquerQuery>) {
            val enumClz = Class.forName(query.qualifiedName!!)
            val constants = enumClz.enumConstants as Array<SquerQuery>
            constants.forEach {
                logger.debug("Adding query: ${query.simpleName}.${it.name}")
                map["${query.simpleName}.${it.name}"] = it.query
            }

        }

        fun getFromRegistry(name: String): AdhocQueryName {
            logger.debug("Getting query: $name")
            return map[name]!!
        }
    }
}


interface SquerQuery{
    val query: AdhocQueryName
    val name: String
}
