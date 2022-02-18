package com.squer.platform.services.caches

import br.com.devsrsouza.redissed.RedissedCommands
import com.fasterxml.jackson.databind.ObjectMapper
import com.squer.platform.services.properties.RemoteCacheConfig
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import redis.clients.jedis.Jedis
import redis.clients.jedis.JedisPool
import redis.clients.jedis.JedisPoolConfig


@Component
class RemoteCache: SquerCache {


    @Autowired
    lateinit var remoteCacheConfig: RemoteCacheConfig

    companion object {
        var jedis: Jedis? = null
    }

    override fun add(cacheable: Cacheable) {
        val commands = getClient()
        try {
            commands.set(cacheable.key(), json(cacheable))
        }finally {
            commands.close()
        }

    }

    override fun get(key: String, clazz: Class<out Cacheable>): Cacheable? {
        val commands = getClient()
        try {
            val obj = commands[key] ?: return null
            return ObjectMapper().readValue(obj, clazz)
        }finally {
            commands.close()
        }
    }

    override fun remove(key: String) {
        val commands = getClient()
        try {
            commands.del(key)
        }finally {
            commands.close()
        }
    }

    private fun getClient(): Jedis {
        /*if (jedis != null) return jedis!!.redissed
        jedis = Jedis(remoteCacheConfig.host, remoteCacheConfig.port, remoteCacheConfig.timeout)
        jedis!!.connect()
        return jedis!!.redissed*/
        val pool = JedisPool(JedisPoolConfig(), remoteCacheConfig.host,remoteCacheConfig.port)
        var jedis: Jedis? = null
        jedis = pool.resource
        return  jedis
    }

    private fun json(obj: Any): String = ObjectMapper().writeValueAsString(obj)

    private fun parseObj(json: String?): Cacheable = ObjectMapper().readValue(json, Cacheable::class.java)
}