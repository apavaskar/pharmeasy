package com.squer.sfe.inventory.controller.dto

class InventoryListDTO {
    var id: String? = null
    var stockId: String? = null
    var code: String? = null
    var name: String? = null
    var type: String? = null
    var batchNumber: Long? = null
    var inventoryDate: Int? = null
    var expiryDate: Int? = null
    var quantityAdded: Int? = null
    var distributed: Int? = null
    var balance: Int? = null
}