package com.squer.platform.security.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.dao.StoreType
import java.util.*
import kotlin.collections.ArrayList

@EntityMeta(prefix = "users", model = "SecurityUserModel", tableName = "FMK_SECURITY_USER")
class SecurityUser: AbstractAuditableEntity() {
    var username: String? = null
    var password: String? = null
    var status: String? = null
    var tenants: ArrayList<UserTenant>? = null
}

@EntityMeta(prefix = "utent", tableName = "FMK_USER_TENANT_ASSOC")
class UserTenant: AbstractAuditableEntity() {
    lateinit var userId: String
    lateinit var tenantId: String
    lateinit var validFrom: Date
    var validUpto: Date? = null
    lateinit var status: String
}