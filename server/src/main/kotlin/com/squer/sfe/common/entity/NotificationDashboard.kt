package com.squer.sfe.common.entity

import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.business.entity.SquerId

class NotificationDashboard : SquerEntity(){
    lateinit var text: String
    lateinit var documentId: SquerId
    var isInline: Boolean = false
    var validUpto: Int = 0
}