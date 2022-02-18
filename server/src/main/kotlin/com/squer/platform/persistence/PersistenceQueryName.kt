package com.squer.platform.persistence

enum class PersistenceQueryName(override val query: AdhocQueryName): SquerQuery  {
    NAMED_ID_SELECT(AdhocQueryName(name = "named_id_select"))

}