package com.squer.platform.appframework.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId

@EntityMeta(prefix = "AMENU", tableName = "FMK_ACTION_MENU")
class ActionMenu: AbstractStandardEntity() {
    lateinit var iconName: String
    lateinit var actionUrl: String
    lateinit var uiInterface: String
    lateinit var privilegeId: SquerId
    lateinit var parentMenuId: NamedSquerId
    var displayOrder: Int = 0
    var children = mutableListOf<ActionMenu>()
}

