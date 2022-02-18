package com.squer.platform.upload.entity.repository

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.business.entity.EntityUtil
import com.squer.platform.business.entity.SquerEntity
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.dao.SqlDao
import com.squer.platform.persistence.repository.SquerBaseModel
import com.squer.platform.upload.UploadQueryName
import com.squer.platform.upload.entity.UploadConfig
import com.squer.platform.upload.entity.UploadSteps
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional

@Component("uploadConfigModel")
@Transactional
class UploadConfigModel : SquerBaseModel() {

    @Autowired
    override lateinit var sqlDao: SqlDao

    override fun postCreate(entity: SquerEntity, meta: EntityMeta): SquerEntity {
        var uploadConfig = entity as UploadConfig
        var steps = uploadConfig.steps
        val stepMeta = EntityUtil.getMeta(steps.get(0))
        steps.forEach{
            sqlDao.insert(getMapper(stepMeta), it)
        }
        return super.postCreate(entity, meta)
    }

    override fun postRestore(entity: SquerEntity, meta: EntityMeta): SquerEntity {
        var uploadConfig = entity as UploadConfig
        val stepMeta = EntityUtil.getMeta(UploadSteps::class)

        var searchCriteria = SearchCriteria(UploadQueryName.UPLOAD_STEPS_SELECT.query)
        entity.id?.let { searchCriteria.addCondition("config_id", it.id) }
        var steps: List<UploadSteps> = find(criteria = searchCriteria).filterIsInstance<UploadSteps>()
        uploadConfig.steps = steps
        return super.postRestore(entity, meta)
    }


}