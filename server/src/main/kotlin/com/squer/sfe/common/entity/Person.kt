package com.squer.sfe.common.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.NamedSquerId
import java.util.*
import kotlin.collections.ArrayList

abstract class Person: AbstractStandardEntity() {
    var gender: NamedSquerId? = null
    var maritalStatus: NamedSquerId? = null
    var dateOfBirth: Date? = null
    var personCode: String? = null
    var contactDetails: List<Contact>? = null
    var addressList: List<Address>? = null
    var isActive: Boolean? = null
}