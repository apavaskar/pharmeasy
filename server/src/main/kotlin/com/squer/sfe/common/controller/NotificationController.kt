package com.squer.sfe.common.controller

import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.ApiDate
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.NotificationDashboard
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RequestMapping("/notifications")
@RestController
class NotificationController {

    @Autowired
    lateinit var repository: SquerRepository

    @GetMapping("/")
    fun getValidNotifications(): List<NotificationDashboard> {
        var criteria = SearchCriteria(CommonQueryName.VALID_NOTIFICATION_SELECT.query)
        criteria.addCondition("notif_valid_upto", ">=", ApiDate(Date()).yYYY_MM_DD)
        return repository.find(criteria).filterIsInstance<NotificationDashboard>()
    }
}