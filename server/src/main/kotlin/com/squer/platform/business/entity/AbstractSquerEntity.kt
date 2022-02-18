package com.squer.platform.business.entity

import java.util.*


open class AbstractAuditableEntity : SquerEntity(), AuditableEntity {
    override var createdBy: String = ""
        get() = field
        set(value) {field = value}
    override var updatedBy: String = ""
        get() = field
        set(value) {field = value}
    override var createdOn: Date = Date()
        get() = field
        set(value) {field = value}
    override var updatedOn: Date = Date()
        get() = field
        set(value) {field = value}
    override var staleId: Long = 1
        get() = field
        set(value) {field = value}
}

open class AbstractStandardEntity: AbstractAuditableEntity(), NameAwareEntity {
    override var name: String = ""
        get() = field
        set(value) { field = value}
    override var ciName: String = ""
        get() = field
        set(value) {
            field = value
        }
}

open class AbstractNamedEntity: SquerEntity(), NameAwareEntity{
    override var name: String = ""
        get() = field
        set(value) { field = value}
    override var ciName: String = ""
        get() = field
        set(value) {
            field = value
        }
}


