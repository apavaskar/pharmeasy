package com.squer.platform.security

import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SquerQuery

enum class SecurityQueryName (override val query: AdhocQueryName): SquerQuery {
    SECURITY_USER_SELECT(AdhocQueryName(name = "users_select")),
    SECURITY_USER_TENANT_SELECT(AdhocQueryName(name = "user_tenant_select")),
    LOGIN_INFO_SELECT(AdhocQueryName(name="logif_select"))

}