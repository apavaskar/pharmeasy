package com.squer.scheduledJob.custom.wockhardt.service

import com.squer.scheduledJob.custom.wockhardt.entity.ScheduledJob
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationContext
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Transactional
@Service
class ScheduleEngine {
        @Autowired
        lateinit var applicationContext: ApplicationContext

        @Autowired
        lateinit var scheduledJobService: ScheduledJobService

        fun execute(jobName: String, parameterMap: MutableMap<String, Any>) {
            var job = applicationContext.getBean(jobName) as ScheduledJobImpl
            var newJob = ScheduledJob()
            newJob.jobType = jobName
            newJob.startTime = Date()

            try {
                //newJob = scheduledJobService.create(newJob)
                //parameterMap["jobId"] = newJob.id!!.id

                job.start(parameterMap)
                job.end(parameterMap)

                newJob.status = "SUCCESS"
                newJob.endTime = Date()
                //scheduledJobService.update(newJob)

            } catch (e: Exception) {
                job.error(parameterMap)
                newJob.status = "ERROR"
                newJob.endTime = Date()
                newJob.errorString = e.message
                //scheduledJobService.update(newJob)
                e.printStackTrace()
            }
        }
}