package com.squer.platform.persistence

import com.squer.platform.persistence.dao.StoreType

class SearchCriteria(var query: AdhocQueryName) {

    private var conditions: MutableMap<String, QueryCondition> = mutableMapOf()
    var orderBy: String = ""

    var schemaName: String? = null
        get() = field
        set(value) { field = value }


    fun addCondition(name:String, value: Any) {
        conditions.put(name, QueryCondition(name, "=", value))
    }

    fun addCondition(name: String, operator: String, value: Any) {
        conditions.put(name, QueryCondition(name, operator, value))
    }

    fun conditions() = conditions


}

data class QueryCondition(val name: String, val operator: String, val value: Any)