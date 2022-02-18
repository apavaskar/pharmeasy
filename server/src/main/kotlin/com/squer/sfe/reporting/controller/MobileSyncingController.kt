package com.squer.sfe.reporting.controller

import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.reporting.controller.dto.AttendeeVisitDTO
import com.squer.sfe.reporting.controller.dto.MonthlyPlanDTO
import com.squer.sfe.reporting.controller.dto.syncing.DashboardDTO
import com.squer.sfe.reporting.controller.dto.syncing.MobileSyncDTO
import com.squer.sfe.reporting.controller.dto.syncing.SyncingVisitDTO
import com.squer.sfe.reporting.entity.DailyVisitAttendee
import com.squer.sfe.reporting.entity.DigitalVisit
import com.squer.sfe.reporting.entity.MonthlyPlan
import com.squer.sfe.reporting.service.MobileSyncingService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.text.SimpleDateFormat
import java.util.*
import kotlin.jvm.Throws

@RequestMapping("/mobile")
@RestController
class MobileSyncingController {

    @Autowired
    lateinit var mobileSyncingService: MobileSyncingService

    @Throws(SquerException::class)
    @PostMapping("/sync")
    fun createEntity(@RequestBody syncDTO: MobileSyncDTO): Map<String, String> {
        return mobileSyncingService.syncData(syncDTO)
    }

    @Throws(SquerException::class)
    @GetMapping("/dashboard/{locationId}/{yearMonth}")
    fun getMobileDashboard(@PathVariable locationId: String,@PathVariable yearMonth: Int): DashboardDTO{
        var calender = Calendar.getInstance()
        val dateFormat = SimpleDateFormat("yyyyMM")
        calender.time = dateFormat.parse(yearMonth.toString())
        val stringDateFormat = SimpleDateFormat("MMM yy")

        return DashboardDTO(
            stringDateFormat.format(calender.time),0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        )
    }
}