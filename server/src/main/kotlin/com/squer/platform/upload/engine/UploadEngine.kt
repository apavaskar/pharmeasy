package com.squer.platform.upload.engine

import com.github.doyaaaaaken.kotlincsv.dsl.csvReader
import com.squer.platform.business.entity.EntityUtil
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.AdhocQueryNameRegistry
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.dao.DbContextHolder
import com.squer.platform.persistence.dao.DbParams
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.security.AuthenticationHandler
import com.squer.platform.upload.UploadQueryName
import com.squer.platform.upload.entity.UploadJob
import com.squer.platform.upload.entity.UploadSteps
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.ApplicationContext
import org.springframework.stereotype.Component
import java.util.*


@Component("uploadEngine")
class UploadEngine {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var authHandler: AuthenticationHandler

    @Value("\${application.config.uploadpath}")
    lateinit var uploadPath: String

    @Autowired
    lateinit var appContext: ApplicationContext

    //@Scheduled(initialDelay = 1000, fixedRate = 60000)
    fun start() {
        DbContextHolder.databaseType = DbParams(tenantId = "tenat00000000000000000000000000000000", schemaName = "housing_1")
        authHandler.authenticate("admin","welcome")
        var criteria = SearchCriteria(UploadQueryName.UPLOAD_JOB_SELECT.query)
        criteria.addCondition("status","QUEUED")
        var jobs = repository.find(criteria) as List<UploadJob>
        jobs.forEach{
            execute(it.configId, it)
        }
    }

    private fun execute(uploadConfigId: SquerId, uploadJob: UploadJob) {
        uploadJob.startTime = Date()
        uploadJob.endTime = null
        changeJobStatus("STARTED", uploadJob)
        val stepsCriteria = SearchCriteria(UploadQueryName.UPLOAD_STEPS_SELECT.query)
        stepsCriteria.addCondition("config_id", uploadConfigId.id)
        val steps = repository.find(stepsCriteria) as List<UploadSteps>
        steps.forEach{
              if (it.typeId == "LOADER") {
                  loadFileToTemp(uploadJob.fileName, it, uploadJob)
              } else if (it.typeId == "SQLSTEP") {
                    fireSql(it.sqlId, uploadJob)
              } else if (it.typeId == "CLASSSTEP") {
                  val beanName = it.executorClass
                  val task = appContext.getBean(beanName) as UploadTask
                  task.execute(uploadJob, it)
              }
        }
    }

    fun fireSql(queryName: String, uploadJob: UploadJob) {
        val modified = mutableMapOf<String, Any>()
        modified.put("jobId", uploadJob.id!!.id)
        repository.fireAdhoc(AdhocQueryNameRegistry.getFromRegistry(queryName), modified)
    }

    fun loadFileToTemp(fileName: String, uploadStep: UploadSteps, uploadJob: UploadJob) {
        val query = AdhocQueryNameRegistry.getFromRegistry(uploadStep.sqlId)
        csvReader().open("${uploadPath}/${fileName}") {
            readAllWithHeaderAsSequence().forEach { row: Map<String, Any> ->
                val modified = row.toMutableMap()
                modified.put("id", EntityUtil.generateId("emply"))
                modified.put("jobid", uploadJob.id!!.id)
                repository.fireAdhoc(query, modified)
            }
        }

    }

    fun changeJobStatus(status: String, uploadJob: UploadJob) {
        uploadJob.status = status
        repository.updateAndCommit(uploadJob)
    }
}