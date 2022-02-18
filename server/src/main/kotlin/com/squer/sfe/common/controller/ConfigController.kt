package com.squer.sfe.common.controller

import com.squer.platform.config.entity.dto.ConfigDTO
import com.squer.platform.config.service.ConfigurationsService
import com.squer.platform.services.exception.SquerException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/config")
@RestController

class ConfigController {
    @Autowired
    lateinit var configService: ConfigurationsService

    @Throws(SquerException::class)
    @GetMapping("/by-location/{locationId}")
    fun getConfigValue (@PathVariable locationId: String, @RequestParam(defaultValue = "") configType: String): List<ConfigDTO> {
        return configService.getMyConfig(locationId,configType)
    }

}