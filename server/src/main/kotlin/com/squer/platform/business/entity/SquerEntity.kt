package com.squer.platform.business.entity


open class SquerEntity() {

    open var id: SquerId? = null
        get() = field
        set(value) { field = value}
}