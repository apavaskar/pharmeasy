package com.squer.platform.business.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import com.squer.platform.services.caches.CacheDef
import com.squer.platform.services.caches.CacheType
import com.squer.platform.services.caches.Cacheable

open class SquerId {
    var id: String = ""
    constructor() {}

    constructor(id: String) {
        this.id = id
    }

    @JsonIgnore
    fun getPrefix() = id.substring(0,5)
}

@CacheDef(type = CacheType.Remote)
open class NamedSquerId : SquerId, Cacheable {
    var name: String? = null

    constructor(): super()

    constructor(id: String, name: String): super(id) {
        this.name = name
    }

    override fun key(): String {
        return id;
    }
}
