package com.squer.sfe.common.controller.dto

data class RCPAItemDTO (
    var itemId: String? = null,
    var itemName: String? = null,
    var rcpaValue: Double? = null,
    var rxnUnits: Int? = null,
    var showInDetailing: Boolean? = null,
    var showInRcpa: Boolean? = null
)