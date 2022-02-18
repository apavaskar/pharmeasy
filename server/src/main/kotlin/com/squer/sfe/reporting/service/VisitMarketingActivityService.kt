package com.squer.sfe.reporting.service

import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import com.squer.sfe.reporting.ReportingQueryName
import com.squer.sfe.reporting.entity.VisitMarketingActivity
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.reporting.controller.MonthlyPlanController
import com.squer.sfe.reporting.controller.ReportingActivityTypeEnum
import com.squer.sfe.reporting.controller.dto.syncing.SyncingMarketingActivityDTO
import com.squer.sfe.reporting.controller.dto.syncing.SyncingVisitDTO
import com.squer.sfe.reporting.entity.DailyVisitAttendee
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import kotlin.jvm.Throws

@Service
class VisitMarketingActivityService {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var visitMarketingActivityBrandsService: VisitMarketingActivityBrandsService

    @Autowired
    lateinit var visitMarketingActivityDoctorsService: VisitMarketingActivityDoctorsService

    @Autowired
    lateinit var monthlyPlanController: MonthlyPlanController

    @Autowired
    lateinit var attendeeService: DailyVisitAttendeeService

    fun findById(id: String): VisitMarketingActivity {
        val searchCriteria = SearchCriteria(ReportingQueryName.MRACT_SELECT.query)
        searchCriteria.addCondition("mract_id", id)
        return repository.find(searchCriteria).filterIsInstance<VisitMarketingActivity>().first()
    }

    fun create(entity: VisitMarketingActivity): VisitMarketingActivity {
        return repository.create(entity) as VisitMarketingActivity
    }

    fun update(entity: VisitMarketingActivity): VisitMarketingActivity {
        var status = entity.isActive.let { entity.isActive }?: run { false }
        if(!status){
            visitMarketingActivityBrandsService.deleteByActivity(entity.id!!.id)
            visitMarketingActivityDoctorsService.deleteByActivity(entity.id!!.id)
        }
        return repository.update(entity) as VisitMarketingActivity
    }

    fun findByParams(valueMap: Map<String,Any>): List<VisitMarketingActivity> {
            val searchCriteria = SearchCriteria(ReportingQueryName.MRACT_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<VisitMarketingActivity>()
    }

    @Throws(SquerException::class)
    fun saveMarketingActivity(dto: SyncingMarketingActivityDTO): VisitMarketingActivity{
        var activity = mapToEntity(dto)
        var monthlyPlanDto = monthlyPlanController.createPlanForUser(dto.locationId!!, dto.yyyyMm!!)

        if(activity.id != null){
            repository.update(activity) as VisitMarketingActivity
            visitMarketingActivityBrandsService.deleteByActivity(activity.id!!.id)
            visitMarketingActivityDoctorsService.deleteByActivity(activity.id!!.id)
            var status = activity.isActive.let { activity.isActive }?: run { false }
            if(status){
                visitMarketingActivityBrandsService.createActivityBrands(dto.brands!!, activity.id!!.id)
                visitMarketingActivityDoctorsService.createActivityDoctors(dto.doctors!!, activity.id!!.id)
            } else {
                var valueMap = mutableMapOf<String, Any>()
                valueMap.put("dtvat_plan_id", monthlyPlanDto.plan!!.id)
                valueMap.put("dtvat_activity_type_id_id", activity.id!!.id)
                var attendee = attendeeService.findByParams(valueMap)[0]
                attendee.isActive = false
                attendeeService.update(attendee)
            }
        }else{
            activity = repository.create(activity) as VisitMarketingActivity
            visitMarketingActivityBrandsService.createActivityBrands(dto.brands!!, activity.id!!.id)
            visitMarketingActivityDoctorsService.createActivityDoctors(dto.doctors!!, activity.id!!.id)

            var valueMap = mutableMapOf<String, Any>()
            valueMap.put("dtvat_plan_id", monthlyPlanDto.plan!!.id)
            valueMap.put("dtvat_yyyy_mm_dd", dto.yyyyMmDd!!)
            valueMap.put("dtvat_is_active", true)
            valueMap.put("dtvat_customer_id", dto.doctors!![0])
            var attendeeList = attendeeService.findByParams(valueMap)
            var attendee = DailyVisitAttendee()

            if(attendeeList.isNotEmpty()){
                attendee = attendeeList[0]
                attendee.isReported = true
                attendee.activityTypeId = activity.id
                attendeeService.update(attendee)
            }else{
                attendee.plan = monthlyPlanDto.plan
                if(activity.inClinicActivity!!)
                    attendee.customer = NamedSquerId(dto.doctors!![0],"")
                else
                    attendee.customer= null
                attendee.activityType = ReportingActivityTypeEnum.MARKETING_ACTIVITY.type
                attendee.activityTypeId = activity.id
                attendee.duration = activity.duration
                attendee.yyyyMm = dto.yyyyMm
                attendee.yyyyMmDd = dto.yyyyMmDd
                attendee.location = NamedSquerId(dto.locationId!!,"")
                attendee.employee = NamedSquerId(dto.employeeID!!,"")
                attendee.isPlanned = false
                attendee.isReported = true
                attendee.isJoint = false
                attendee.isRcpaDone = false
                attendee.isVideoShown = false
                attendee.visitType = null
                attendee.remarks = null
                attendee.isActive = true
                attendee.joineeReference = null
                attendeeService.create(attendee)
            }
        }
        return activity
    }

    fun mapToEntity(dto: SyncingMarketingActivityDTO): VisitMarketingActivity{
        var activity = VisitMarketingActivity()
        dto.entityId.let { activity.id = SquerId(dto.entityId!!) }
        activity.activity = NamedSquerId(dto.activityId!!,"")
        activity.duration = dto.duration
        activity.inClinicActivity = dto.inClinicActivity
        activity.isActive = dto.actionTaken == 'A' || dto.actionTaken == 'U'
        return activity
    }


}