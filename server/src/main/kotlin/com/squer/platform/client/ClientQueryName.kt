package com.squer.platform.client

import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SquerQuery

enum class ClientQueryName(override val query: AdhocQueryName): SquerQuery {
    MyMenus(AdhocQueryName(name = "my_menu_select"))
}