package com.squer.platform.persistence.dao


import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonDeserializer
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.module.SimpleModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.mongodb.client.MongoDatabase
import com.squer.platform.business.entity.EntityUtil
import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.multitenancy.entity.TenantDefinition
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.services.properties.ConfigDbProperties
import org.bson.Document
import org.litote.kmongo.KMongo
import org.litote.kmongo.findOne
import org.litote.kmongo.getCollection
import org.litote.kmongo.json
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.*

@Component
class DocumentDao: SquerDao {

    @Autowired
    private lateinit var configDbProps: ConfigDbProperties

    companion object {
        val mapOfUrls = mutableMapOf<String, ConfigDbProperties>()
    }

    override fun insert(mapper: SquerDbMapper, entity: SquerEntity) {
        val entityMeta = EntityUtil.getMeta(entity)
        val db = getMongoClient()
        val collection = db.getCollection<SquerEntity>(entityMeta.prefix)
        collection.insertOne(entity)
    }

    override fun update(mapper: SquerDbMapper, entity: SquerEntity): Int {
        val entityMeta = EntityUtil.getMeta(entity)
        val db = getMongoClient()
        val collection = db.getCollection<SquerEntity>(entityMeta.prefix)
        //collection.updateOne(entity)
        TODO("Need to find update")
    }


    override fun select(mapper: SquerDbMapper, id: String): SquerEntity {
        val entityMeta = EntityUtil.getMeta(mapper.getMappedClass())
        val db = getMongoClient()
        val collection = db.getCollection(entityMeta.prefix)
        val entity = collection.findOne("{id: '${id}'}")
        entity?.remove("_id")
        return parse(entity) as SquerEntity
    }

    override fun select(criteria: SearchCriteria): List<Any> {
        TODO("Select with Criteria not done")
    }

    override fun delete(mapper: SquerDbMapper, entity: SquerEntity): Int {
        TODO("Not yet implemented")
    }


    fun getMongoClient(): MongoDatabase {
        return if (mapOfUrls.containsKey(DbContextHolder.databaseType.tenantId)) {
            val client = KMongo.createClient("mongodb://${configDbProps.host}:${configDbProps.port}")
            client.getDatabase(configDbProps.db)
        } else {
            mapOfUrls.put(DbContextHolder.databaseType.tenantId, ConfigDbProperties("localhost",27017,"temp"))
            val client = KMongo.createClient("mongodb://${configDbProps.host}:${configDbProps.port}")
            client.getDatabase(configDbProps.db)
        }
    }


    fun parse(document: Document?): Any {

        val mapper = ObjectMapper()
            .registerModule(KotlinModule())
            .registerModule(
                SimpleModule()
                    .addDeserializer(Date::class.java, SquerEntityConversions.DateDeserializer)
            )
        val def = mapper.readValue(document?.json, TenantDefinition::class.java)
        return  def
    }

    override fun insertAdhoc(queryName: String, row: MutableMap<String, Any>) {

    }

    override fun updateAdhoc(queryName: String, row: MutableMap<String, Any>) {

    }

    override fun deleteAdhoc(queryName: String, row: MutableMap<String, Any>) {
        TODO("Not yet implemented")
    }

}


object SquerEntityConversions {

    object DateDeserializer : JsonDeserializer<Date>() {
        override fun deserialize(p: JsonParser, ctxt: DeserializationContext): Date {
            val node = p.readValueAsTree<JsonNode>()
            val dateString = node.get("\$date").asText()
            val date = LocalDateTime.parse(dateString.substring(0, dateString.length-1)) //, DateTimeFormatter.ISO_INSTANT)
            return Date.from(date.atZone(ZoneId.systemDefault()).toInstant())
        }
    }
}


