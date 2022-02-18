package com.squer.platform.config

import com.squer.platform.persistence.AdhocQueryName
import com.squer.platform.persistence.SquerQuery
enum class ConfigQueryName (override val query: AdhocQueryName): SquerQuery {
CONFG_SELECT (AdhocQueryName("confg_select")),
CONFG_INSERT (AdhocQueryName("confg_insert")),
CONFG_UPDATE (AdhocQueryName("confg_update")),
CONFG_DELETE (AdhocQueryName("confg_delete")),
/*===ADD TO FILE===*/
MY_CONFIG_SELECT(AdhocQueryName("my-config_select"))
;}
