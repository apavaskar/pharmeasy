package com.squer.platform.security.entity

import com.squer.platform.business.entity.NameAwareEntity
import com.squer.platform.business.entity.SquerEntity

class SecurityPrivilege: SquerEntity(), NameAwareEntity {
    override var name: String = ""
        get() = field
        set(value) { field = value}
    override var ciName: String = ""
        get() = field
        set(value) { field = value }
}