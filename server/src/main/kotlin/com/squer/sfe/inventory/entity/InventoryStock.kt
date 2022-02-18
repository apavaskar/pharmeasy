package com.squer.sfe.inventory.entity

import com.squer.platform.business.entity.AbstractAuditableEntity
import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.NamedSquerId

@EntityMeta(prefix = "invst", tableName = "INV_INVENTORY_STOCK")
class InventoryStock: AbstractAuditableEntity()  {
    var item: NamedSquerId? = null
    var documentNumber: String? = null
    var itemNumber: String? = null
    var location: NamedSquerId? = null
    var employee: NamedSquerId? = null
    var inventoryDate: Int? = null
    var batchNumber: Long? = null
    var expiryDate: Int? = null
    var sapDownloadDate: Int? = null
    var netValue: Double? = null
    var quantityAdded: Int? = null
    var distributed: Int? = null
    var balance: Int? = null
}