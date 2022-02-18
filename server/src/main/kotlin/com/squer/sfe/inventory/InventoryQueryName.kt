package com.squer.sfe.inventory

import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SquerQuery
enum class InventoryQueryName (override val query: AdhocQueryName): SquerQuery {
INVMT_SELECT (AdhocQueryName("invmt_select")),
INVMT_INSERT (AdhocQueryName("invmt_insert")),
INVMT_UPDATE (AdhocQueryName("invmt_update")),
INVMT_DELETE (AdhocQueryName("invmt_delete")),
INVST_SELECT (AdhocQueryName("invst_select")),
INVST_INSERT (AdhocQueryName("invst_insert")),
INVST_UPDATE (AdhocQueryName("invst_update")),
INVST_DELETE (AdhocQueryName("invst_delete")),
/*===ADD TO FILE===*/
INVENTORY_FOR_EMPLOYEE_SELECT(AdhocQueryName("inventory-for-employee-select")),
INVENTORY_STOCK_SELECT(AdhocQueryName("inventory-stock-select")),
;}
