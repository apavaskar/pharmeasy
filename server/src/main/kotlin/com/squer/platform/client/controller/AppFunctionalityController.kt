package com.squer.platform.client.controller

import com.squer.platform.appframework.entity.AppFunctionality
import com.squer.platform.business.entity.SquerId
import com.squer.platform.client.PlatformClientLoggerName
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.platform.services.logging.SquerLogger
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RequestMapping("/functionality")
@RestController
class AppFunctionalityController {

    companion object{
        val logger = SquerLogger.getLogger(PlatformClientLoggerName.Functionality)
    }

    @Autowired
    lateinit var repository: SquerRepository

    @PutMapping("/{id}/change/{status}")
    @Throws(SquerException::class)
    fun changeStatus(@PathVariable id: String, @PathVariable status: String): Boolean {
        try {
            var functionality = repository.restore(SquerId(id = id)) as AppFunctionality
            functionality.on = status == "on"
            repository.update(functionality)
            return true
        }catch (e: SquerException) {
            logger.error(e.stackTraceToString())
            return false
        }
    }

    @GetMapping("/{id}")
    @Throws(SquerException::class)
    fun getFunctionality(@PathVariable id: String): AppFunctionality {
        return repository.restore(SquerId(id = id)) as AppFunctionality
    }


}
