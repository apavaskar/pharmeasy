package com.squer.sfe.reporting.controller

import com.squer.sfe.reporting.entity.VisitMarketingActivity
import com.squer.sfe.reporting.service.VisitMarketingActivityService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.common.controller.dto.MarketingActivityDTO
import com.squer.sfe.reporting.controller.dto.MarketingActivityBrandDTO
import com.squer.sfe.reporting.controller.dto.MarketingActivityDoctorDTO
import com.squer.sfe.reporting.controller.dto.VisitMarketingActivityDTO
import com.squer.sfe.reporting.entity.VisitMarketingActivityBrands
import com.squer.sfe.reporting.service.VisitMarketingActivityBrandsService
import com.squer.sfe.reporting.service.VisitMarketingActivityDoctorsService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/visitmarketingactivity")
@RestController
class VisitMarketingActivityController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: VisitMarketingActivityService

    @Autowired
    lateinit var marketingBrandService: VisitMarketingActivityBrandsService

    @Autowired
    lateinit var marketingDoctorService: VisitMarketingActivityDoctorsService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): VisitMarketingActivity {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: VisitMarketingActivity): VisitMarketingActivity {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: VisitMarketingActivity): VisitMarketingActivity {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-attendee/{attendeeId}")
    fun getByAttendee(@PathVariable attendeeId: String): List<VisitMarketingActivityDTO> {
        var marketingActivities = mutableListOf<VisitMarketingActivityDTO>()
        var valueMap = mutableMapOf<String, Any>()
        valueMap.put("mract_attendee_id", attendeeId)
        valueMap.put("mract_is_active", true)
        var activities = entityService.findByParams(valueMap)

        activities.forEach{
            var bvMap = mutableMapOf<String, Any>()
            bvMap.put("mracb_marketing_activity_id", it.id!!.id)
            var brandList = marketingBrandService.findByParams(bvMap)
            var mBrands = mutableListOf<MarketingActivityBrandDTO>()
            brandList.forEach{ bd -> mBrands.add(MarketingActivityBrandDTO(bd.id!!.id,bd.brand!!.id))}

            var dvMap = mutableMapOf<String, Any>()
            dvMap.put("mgadt_marketing_activity_id", it.id!!.id)
            var doctorList = marketingDoctorService.findByParams(dvMap)
            var mDoctors = mutableListOf<MarketingActivityDoctorDTO>()
            doctorList.forEach { dd -> mDoctors.add(MarketingActivityDoctorDTO(dd.id!!.id,dd.doctor!!.id))}

            marketingActivities.add(
                VisitMarketingActivityDTO(
                    it.id!!.id,
                    it.attendee!!.id,
                    it.activity!!.id,
                    it.duration,
                    mBrands,
                    mDoctors
                )
            )
        }
        return marketingActivities
    }
}