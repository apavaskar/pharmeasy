package com.squer.platform.security.entity.repository

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.persistence.repository.SquerBaseModel
import org.springframework.stereotype.Component

@Component("SecurityRoleModel")
class SecurityRoleModel: SquerBaseModel() {

    override fun postRestore(entity: SquerEntity, meta: EntityMeta): SquerEntity {

        return super.postRestore(entity, meta)
    }
}