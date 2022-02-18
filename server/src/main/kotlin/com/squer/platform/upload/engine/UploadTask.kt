package com.squer.platform.upload.engine

import com.squer.platform.upload.entity.UploadJob
import com.squer.platform.upload.entity.UploadSteps

interface UploadTask {

    fun execute(uploadJob: UploadJob, uploadStep: UploadSteps)
}