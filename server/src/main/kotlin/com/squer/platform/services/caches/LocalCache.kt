package com.squer.platform.services.caches

import org.springframework.stereotype.Component

@Component
class LocalCache: SquerCache {
    companion object {
        val map = linkedMapOf<String, Cacheable>()
    }
    val capacity = 100000

    override fun add(cacheable: Cacheable) {
        val key = cacheable.key()
        if(map.containsKey(key)) {
            addToBottom(cacheable)
            return
        }
        if (map.size < capacity) {
            map.put(cacheable.key(), cacheable)
        } else {
            map.remove(map.iterator().next().key)
            map.put(cacheable.key(), cacheable)
        }
    }

    override fun get(key: String, clazz: Class<out Cacheable>): Cacheable? {
        if (map.containsKey(key)) {
            val cacheable = map.get(key)
            addToBottom(cacheable!!)
            return cacheable
        }
        return null
    }

    override fun remove(key: String) {
        map.remove(key)
    }

    private fun addToBottom(cacheable: Cacheable) {
        map.remove(cacheable.key())
        map.put(cacheable.key(), cacheable)
    }
}

