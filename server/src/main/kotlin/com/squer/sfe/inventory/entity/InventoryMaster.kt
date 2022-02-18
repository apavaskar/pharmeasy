package com.squer.sfe.inventory.entity

import com.squer.platform.business.entity.AbstractStandardEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "invmt", tableName = "INV_INVENTORY_MASTER")
class InventoryMaster: AbstractStandardEntity() {
    var inventoryCode: String? = null
    var type: NamedSquerId? = null //input / sample
    var isActive: Boolean? = null
}