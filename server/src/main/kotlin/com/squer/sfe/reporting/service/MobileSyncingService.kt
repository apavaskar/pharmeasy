package com.squer.sfe.reporting.service

import com.squer.platform.business.entity.NamedSquerId
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.entity.Product
import com.squer.sfe.common.service.DoctorService
import com.squer.sfe.common.service.EmployeeService
import com.squer.sfe.common.service.ProductService
import com.squer.sfe.reporting.controller.ReportingActivityTypeEnum
import com.squer.sfe.reporting.controller.dto.syncing.*
import com.squer.sfe.reporting.controller.enum.HospitalRcpaStatusEnum
import com.squer.sfe.reporting.controller.enum.JoineeStatusEnum
import com.squer.sfe.reporting.entity.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.RequestBody
import java.text.SimpleDateFormat
import java.util.*

/*
action taken
n - nothing
A - add
U - update
D - deactivate
*/

@Transactional
@Service
class MobileSyncingService {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var employeeService: EmployeeService

    @Autowired
    lateinit var doctorService: DoctorService

    @Autowired
    lateinit var monthlyPlanService: MonthlyPlanService

    @Autowired
    lateinit var dailyVisitAttendeeService: DailyVisitAttendeeService

    @Autowired
    lateinit var visitRcpaService: VisitRcpaService

    @Autowired
    lateinit var visitDetailingService: VisitDetailingService

    @Autowired
    lateinit var visitJoineeService: DailyVisitJoineeService

    @Autowired
    lateinit var digitalVisitService: DigitalVisitService

    @Autowired
    lateinit var visitInputsService: VisitInputsService

    @Autowired
    lateinit var visitMarketingActivityService: VisitMarketingActivityService

    @Autowired
    lateinit var hospitalRcpaService: HospitalRcpaService

    @Autowired
    lateinit var hospitalDailyRcpaService: HospitalDailyRcpaService

    @Autowired
    lateinit var productService: ProductService

    fun syncData (@RequestBody syncDTO: MobileSyncDTO): MutableMap<String,String> {
        var visitIdMap = syncVisitData(syncDTO.visits)
        var marketingActivityMap = syncMarketingActivities(syncDTO.marketingActivities)
        var hospitalRcpaMap = syncHospitalRcpa(syncDTO.hospitalRcpaList)
        var hospitalDailyRcpaMap = syncHospitalDailyRcpa(syncDTO.hospitalDailyRcpaList)
        visitIdMap.putAll(marketingActivityMap)
        visitIdMap.putAll(hospitalRcpaMap)
        visitIdMap.putAll(hospitalDailyRcpaMap)
        return visitIdMap
    }

    fun syncVisitData(@RequestBody syncDTOList: List<SyncingVisitDTO>): MutableMap<String,String> {
        try{
            var externalIdMap = mutableMapOf<String,String>()
            syncDTOList.forEach{ syncDTO ->
                val yyyyMMdd = SimpleDateFormat("yyyyMMdd")
                val yyyyMM = SimpleDateFormat("yyyyMM")
                val calendar = Calendar.getInstance()
                calendar.time = yyyyMMdd.parse(syncDTO.yyyyMmDd!!.toString())
                val employee = employeeService.findById(syncDTO.employeeId!!)

                var monthlyPlan = MonthlyPlan()
                var planValeMap = mutableMapOf<String,Any>()
                planValeMap.put("mtpln_location_id", employee.profiles!!.get(0).location!!.id)
                planValeMap.put("mtpln_employee_id", employee.id!!.id)
                planValeMap.put("mtpln_year_month", yyyyMM.format(calendar.time).toInt())
                var plans = monthlyPlanService.findByParams(planValeMap)
                if(!plans.isEmpty()){
                    monthlyPlan = plans[0]
                } else {
                    monthlyPlan = monthlyPlanService.createPlan(employee.id!!.id,employee.profiles!!.get(0).location!!.id,calendar.get(Calendar.YEAR) , yyyyMM.format(calendar.time).toInt())
                }
                var dailyVisitAttendee = DailyVisitAttendee()
                if(syncDTO.attendeeId!=null){
                        externalIdMap.putAll(updateAttendee(syncDTO,yyyyMM.format(calendar.time).toInt(),monthlyPlan.id!!))
                }else{
                    externalIdMap.putAll(createAttendee(syncDTO,yyyyMM.format(calendar.time).toInt(),monthlyPlan.id!!))
                }

                /*syncDTO.joineeReferenceId?.let {
                    var status = if(syncDTO.joineeMarkStatus == null) { JoineeStatusEnum.PENDING.status.id} else { syncDTO.joineeMarkStatus }
                    markJoinee(syncDTO.joineeReferenceId!!, status!!)
                }*/

                if(syncDTO.activityType == ReportingActivityTypeEnum.CALL_ACTIVITY.type.id && syncDTO.isReported!!){
                    visitJoineeService.markVisitForManager(employee.id!!.id, syncDTO.customerId!!, JoineeStatusEnum.APPROVED.status.id)
                }
            }
            return externalIdMap
        }catch (e: Exception){
            e.printStackTrace()
            throw e
        }
    }

    fun updateAttendee(syncDTO: SyncingVisitDTO, yyyyMM: Int, planId: SquerId): MutableMap<String,String> {
        var dailyVisitAttendee = dailyVisitAttendeeService.findById(syncDTO.attendeeId!!)
        var externalIdMap = mutableMapOf<String,String>()
        if (syncDTO.coordinates != null && syncDTO.coordinates!!.contains(",")) {
            dailyVisitAttendee.longitude = syncDTO.coordinates!!.split(",")[0]
            dailyVisitAttendee.longitude = syncDTO.coordinates!!.split(",")[1]
        }
        if(syncDTO.isActive == false || syncDTO.isReported == false){
            deactivateRCPA(syncDTO.attendeeId!!)
            deactivateDetailing(syncDTO.attendeeId!!)
            deactivateJoinee(syncDTO.attendeeId!!)
            deactivateDigitalVisit(syncDTO.attendeeId!!)
            deactivateVisitInputs(syncDTO.attendeeId!!, dailyVisitAttendee.employee!!.id)

            if(syncDTO.isActive == false)
                dailyVisitAttendee.isActive = false
            if(syncDTO.isReported == false)
                dailyVisitAttendee.isReported = false
            dailyVisitAttendee.visitRecordedTime = syncDTO.visitRecordTime
            dailyVisitAttendeeService.update(dailyVisitAttendee)
        }else{
            dailyVisitAttendee = dailyVisitAttendeeService.findById(syncDTO.attendeeId!!)
            dailyVisitAttendee =  dailyVisitAttendeeService.update(mapToAttendee(syncDTO,dailyVisitAttendee, yyyyMM, planId))
            externalIdMap.put(syncDTO.externalCode!!, dailyVisitAttendee.id!!.id)

            //rcpa
            syncDTO.rcpaList!!.forEach{
                it.attendeeId = dailyVisitAttendee.id!!.id
                if(it.actionTaken == 'A'){
                    var rcpa = visitRcpaService.create(mapToRcpa(it, VisitRcpa()))
                    externalIdMap.put(it.externalCode!!,rcpa.id!!.id)
                }else if(it.actionTaken == 'U'){
                    var rcpa = visitRcpaService.findById(it.rcpaId!!)
                    rcpa = visitRcpaService.update(mapToRcpa(it,rcpa))
                    externalIdMap.put(it.externalCode!!,rcpa.id!!.id)
                }else if(it.actionTaken == 'D'){
                    it.rcpaId?.let { rcpaID ->
                        var rcpa= visitRcpaService.deactivateRCPAById(rcpaID)
                        externalIdMap.put(it.externalCode!!,rcpa.id!!.id)
                    }
                }
            }

            //detailing
            var brandList = mutableListOf<String>()
            syncDTO.detailingList!!.forEach{
                it.attendeeId = dailyVisitAttendee.id!!.id
                if(it.actionTaken == 'A'){
                    if(!brandList.contains(it.brandId)) {
                        var detailing = visitDetailingService.create(mapDetailing(it, VisitDetailing()))
                        externalIdMap.put(it.externalCode!!, detailing.id!!.id)
                        brandList.add(it.brandId!!)
                    }
                }else if(it.actionTaken == 'U'){
                    var detailing = visitDetailingService.findById(it.detailingId!!)
                    detailing = visitDetailingService.update(mapDetailing(it,detailing))
                    externalIdMap.put(it.externalCode!!,detailing.id!!.id)
                }else if(it.actionTaken == 'D'){
                    it.detailingId?.let { detailingId ->
                        var detailing= visitDetailingService.deactivateDetailingById(detailingId)
                        externalIdMap.put(it.externalCode!!,detailing.id!!.id)
                    }
                }
            }
            visitDetailingService.updateSequence(dailyVisitAttendee.id!!.id)

            //joinee
            syncDTO.joineeList!!.forEach{
                it.attendeeId = dailyVisitAttendee.id!!.id
                if(it.actionTaken == 'A') {
                    var joinee = DailyVisitJoinee()
                    joinee.attendee = SquerId(it.attendeeId!!)
                    joinee.manager = NamedSquerId(it.managerId!!, "")
                    joinee.isActive = true
                    joinee = visitJoineeService.create(joinee)
                    externalIdMap.put(it.externalCode!!, joinee.id!!.id)
                } else if(it.actionTaken == 'D'){
                    it.joineeId?.let { joineeId ->
                        var joinee = visitJoineeService.deactivateJoineeById(joineeId)
                        externalIdMap.put(it.externalCode!!,joinee.id!!.id)
                    }
                }
            }

            // digital visit
            syncDTO.digitalVisitData!!.forEach{
                it.attendeeId = dailyVisitAttendee.id!!.id
                if(it.actionTaken == 'A'){
                    var visit = digitalVisitService.create(mapDigitalCallData(it, DigitalVisit()))
                    externalIdMap.put(it.externalCode!!,visit.id!!.id)
                }else if(it.actionTaken == 'U'){
                    var visit = digitalVisitService.findById(it.digitalVisitId!!)
                    visit = digitalVisitService.update(mapDigitalCallData(it,visit))
                    externalIdMap.put(it.externalCode!!,visit.id!!.id)
                }else if(it.actionTaken == 'D'){
                    it.digitalVisitId?.let { digitalVisitId ->
                        var visit= digitalVisitService.deactivateById(digitalVisitId)
                        externalIdMap.put(it.externalCode!!,visit.id!!.id)
                    }
                }
            }

            // inputs
            syncDTO.inputsList!!.forEach {
                it.attendeeId = dailyVisitAttendee.id!!.id
                if(it.actionTaken == 'A'){
                    var input = visitInputsService.distributeInputs(mapInputData(it, VisitInputs()),dailyVisitAttendee.employee!!.id)
                    externalIdMap.put(it.externalCode!!,input.id!!.id)
                }else if(it.actionTaken == 'D'){
                    it.inputId?.let { inputId ->
                        var input = visitInputsService.deactivateById(inputId, dailyVisitAttendee.employee!!.id)
                        externalIdMap.put(it.externalCode!!,input.id!!.id)
                    }
                }
            }
        }
        return externalIdMap
    }

    @Throws
    fun createAttendee(syncDTO: SyncingVisitDTO, yyyyMM: Int, planId: SquerId): MutableMap<String,String>{
        var externalIdMap = mutableMapOf<String,String>()
        //check visit already exists
        val valueMap = mutableMapOf<String,Any>()
        valueMap.put("dtvat_plan_id",planId.id)
        valueMap.put("dtvat_yyyy_mm_dd", syncDTO.yyyyMmDd!!)
        if(syncDTO.activityType == ReportingActivityTypeEnum.CALL_ACTIVITY.type.id)
            valueMap.put("dtvat_customer_id", syncDTO.customerId!!)
        else
            valueMap.put("dtvat_activity_type_id_id", syncDTO.activityTypeId!!)

        var visits = dailyVisitAttendeeService.findByParams(valueMap)

        if(!visits.isEmpty()){
            syncDTO.attendeeId = visits[0].id?.id
            return updateAttendee(syncDTO,yyyyMM,planId)
        }
        var dailyVisitAttendee = dailyVisitAttendeeService.create(mapToAttendee(syncDTO, DailyVisitAttendee(),yyyyMM, planId))
        if (syncDTO.coordinates != null && syncDTO.coordinates!!.contains(",")) {
            dailyVisitAttendee.longitude = syncDTO.coordinates!!.split(",")[0]
            dailyVisitAttendee.longitude = syncDTO.coordinates!!.split(",")[1]
        }
        externalIdMap.put(syncDTO.externalCode!!, dailyVisitAttendee.id!!.id)

        syncDTO.rcpaList!!.forEach{
            it.attendeeId = dailyVisitAttendee.id!!.id
            var rcpa = visitRcpaService.create(mapToRcpa(it, VisitRcpa()))
            externalIdMap.put(it.externalCode!!,rcpa.id!!.id)
        }

        var brandList = mutableListOf<String>()
        var bdSeq = 1
        syncDTO.detailingList!!.forEach{
            it.attendeeId = dailyVisitAttendee.id!!.id
            it.sequence = bdSeq
            bdSeq += 1
            if(!brandList.contains(it.brandId)) {
                var detailing = visitDetailingService.create(mapDetailing(it, VisitDetailing()))
                externalIdMap.put(it.externalCode!!, detailing.id!!.id)
                brandList.add(it.brandId!!)
            }
        }

        syncDTO.digitalVisitData!!.forEach{
            it.attendeeId = dailyVisitAttendee.id!!.id
            var visit = digitalVisitService.create(mapDigitalCallData(it, DigitalVisit()))
            externalIdMap.put(it.externalCode!!,visit.id!!.id)
        }

        syncDTO.joineeList!!.forEach {
            var joinee = DailyVisitJoinee()
            joinee.attendee = dailyVisitAttendee.id
            joinee.manager = NamedSquerId(it.managerId!!, "")
            joinee.isActive = true
            joinee.status = JoineeStatusEnum.PENDING.status
            joinee = visitJoineeService.create(joinee)
            externalIdMap.put(it.externalCode!!, joinee.id!!.id)
        }

        syncDTO.inputsList!!.forEach {
            it.attendeeId = dailyVisitAttendee.id!!.id
            var inputs = visitInputsService.distributeInputs(mapInputData(it, VisitInputs()),dailyVisitAttendee.employee!!.id)
            externalIdMap.put(it.externalCode!!,inputs.id!!.id)
        }
        return externalIdMap
    }


    fun syncMarketingActivities(activityList: List<SyncingMarketingActivityDTO>): MutableMap<String,String> {
        try {
            var externalIdMap = mutableMapOf<String,String>()
            activityList.forEach{
                var activity =  visitMarketingActivityService.saveMarketingActivity(it)
                externalIdMap.put(it.externalCode!!, activity.id!!.id)
            }
            return externalIdMap
        }catch (e: Exception){
              throw e
        }
    }

    fun syncHospitalRcpa(rcpaList: List<SyncingHospitalRcpaDTO>): MutableMap<String,String>{
        try {
            var externalIdMap = mutableMapOf<String, String>()
            rcpaList.forEach {
                if(it.entityId != null){
                    var rcpa = hospitalRcpaService.findById(it.entityId!!)
                    rcpa.icuPatients = it.icuPatients
                    rcpa.emrokPatients = it.emrokPatients
                    rcpa.teicoplaninPatients = it.telcoplaninPatients
                    if(it.actionTaken == 'D')
                        rcpa.isActive = false

                    hospitalRcpaService.update(rcpa)
                    externalIdMap.put(it.externalCode!!,it.entityId!!)
                }else{
                    var rcpa = HospitalRcpa()
                    val yyyyMMdd = SimpleDateFormat("yyyyMMdd")
                    val yyyyMM = SimpleDateFormat("yyyyMM")
                    val calendar = Calendar.getInstance()
                    calendar.time = yyyyMMdd.parse(it.rcpaDate!!.toString())

                    var valueMap = mutableMapOf<String, Any>()
                    valueMap.put("hrcpa_hospital_id",it.hospitalId!!)
                    valueMap.put("hrcpa_location_id",it.locationId!!)
                    valueMap.put("hrcpa_yyyy_mm_dd",yyyyMMdd.format(calendar.time).toInt())
                    var rlist = hospitalRcpaService.findByParams(valueMap)
                    if(!rlist.isEmpty()){
                        rcpa = rlist[0]
                        rcpa.icuPatients = it.icuPatients
                        rcpa.emrokPatients = it.emrokPatients
                        rcpa.teicoplaninPatients = it.telcoplaninPatients
                        if(it.actionTaken == 'D')
                            rcpa.isActive = false

                        hospitalRcpaService.update(rcpa)
                        externalIdMap.put(it.externalCode!!,rcpa.id!!.id)
                    }else {
                        rcpa.hospital = NamedSquerId(it.hospitalId!!, "")
                        rcpa.location = NamedSquerId(it.locationId!!, "")
                        rcpa.employee = NamedSquerId(it.employeeId!!, "")
                        rcpa.yyyyMm = yyyyMM.format(calendar.time).toInt()
                        rcpa.yyyyMmDd = it.rcpaDate
                        rcpa.icuPatients = it.icuPatients
                        rcpa.emrokPatients = it.emrokPatients
                        rcpa.teicoplaninPatients = it.telcoplaninPatients
                        rcpa.isActive = true
                        rcpa.status = HospitalRcpaStatusEnum.SUBMITTED.status
                        rcpa = hospitalRcpaService.create(rcpa)
                        externalIdMap.put(it.externalCode!!, rcpa.id!!.id)
                    }
                }
            }
            return externalIdMap
        }catch (e: Exception){
            throw e
        }
    }

    fun syncHospitalDailyRcpa(rcpaList: List<SyncingHospitalDailyRcpaDTO>): MutableMap<String,String>{
        var externalIdMap = mutableMapOf<String, String>()
        rcpaList.forEach {
            var doctorId: String? = null
            var doctorName = it.doctorName
            it.doctorId?.let { docId ->
                var doctor = doctorService.findById(docId)
                doctorId = doctor.id!!.id
                doctorName = doctor.name
            }
            if (it.entityId != null) {
                var rcpa = hospitalDailyRcpaService.findById(it.entityId!!)
                doctorId?.let { doctorId -> rcpa.doctorId = NamedSquerId(doctorId ,"") }
                rcpa.doctorName = doctorName
                rcpa.emrokIvPatients = it.emrokIvPatients
                rcpa.emrokOPatients = it.emrokOPatients
                rcpa.bothPatients = it.bothPatients
                if (it.actionTaken == 'D')
                    rcpa.isActive = false

                hospitalDailyRcpaService.update(rcpa)
                externalIdMap.put(it.externalCode!!, it.entityId!!)
            } else {
                var rcpa = HospitalDailyRcpa()
                val yyyyMMdd = SimpleDateFormat("yyyyMMdd")
                val yyyyMM = SimpleDateFormat("yyyyMM")
                val calendar = Calendar.getInstance()
                calendar.time = yyyyMMdd.parse(it.rcpaDate!!.toString())

                var valueMap = mutableMapOf<String, Any>()
                valueMap.put("hdrcp_hospital_id",it.hospitalId!!)
                valueMap.put("hdrcp_location_id",it.locationId!!)
                valueMap.put("hdrcp_yyyy_mm_dd",yyyyMMdd.format(calendar.time).toInt())
                var rlist = hospitalDailyRcpaService.findByParams(valueMap)
                if(!rlist.isEmpty()){
                    rcpa = rlist[0]
                    rcpa.emrokIvPatients = it.emrokIvPatients
                    rcpa.emrokOPatients = it.emrokOPatients
                    rcpa.bothPatients = it.bothPatients
                    doctorId?.let { doctorId -> rcpa.doctorId = NamedSquerId(doctorId ,"") }
                    rcpa.doctorName = doctorName
                    if (it.actionTaken == 'D')
                        rcpa.isActive = false

                    hospitalDailyRcpaService.update(rcpa)
                    externalIdMap.put(it.externalCode!!, rcpa.id!!.id)
                }else {
                    rcpa.hospital = NamedSquerId(it.hospitalId!!, "")
                    rcpa.location = NamedSquerId(it.locationId!!, "")
                    rcpa.employee = NamedSquerId(it.employeeId!!, "")
                    it.doctorId?.let { doctorId -> rcpa.doctorId = NamedSquerId(doctorId ,"") }
                    rcpa.doctorName = doctorName
                    rcpa.yyyyMm = yyyyMM.format(calendar.time).toInt()
                    rcpa.yyyyMmDd = it.rcpaDate
                    rcpa.emrokIvPatients = it.emrokIvPatients
                    rcpa.emrokOPatients = it.emrokOPatients
                    rcpa.bothPatients = it.bothPatients
                    rcpa.isActive = true
                    rcpa = hospitalDailyRcpaService.create(rcpa)
                    externalIdMap.put(it.externalCode!!, rcpa.id!!.id)
                }
            }
        }
        return externalIdMap
    }

    fun deactivateRCPA(attendeeId: String): List<VisitRcpa>{
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("vrcpa_attendee_id",attendeeId)
        var rcpaList = visitRcpaService.findByParams(valueMap)
        var newList = mutableListOf<VisitRcpa>()
        try {
            rcpaList.forEach{
                it.isActive = false
                newList.add(visitRcpaService.update(it))
            }
            return newList
        }catch (e: Exception){
            throw e
        }
    }

    fun deactivateDetailing(attendeeId: String): List<VisitDetailing>{
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("vdetl_attendee_id",attendeeId)
        var detailingList = visitDetailingService.findByParams(valueMap)
        var newList = mutableListOf<VisitDetailing>()
        try {
            detailingList.forEach{
                it.isActive = false
                newList.add(visitDetailingService.update(it))
            }
            return newList
        }catch (e: Exception){
            throw e
        }
    }

    fun deactivateJoinee(attendeeId: String): List<DailyVisitJoinee>{
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("dtvje_attendee_id",attendeeId)
        var joineeList = visitJoineeService.findByParams(valueMap)
        var newList = mutableListOf<DailyVisitJoinee>()
        try {
            joineeList.forEach{
                it.isActive = false
                newList.add(visitJoineeService.update(it))
            }
            return newList
        }catch (e: Exception){
            throw e
        }
    }

    fun deactivateDigitalVisit(attendeeId: String): List<DigitalVisit>{
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("digvs_attendee_id",attendeeId)
        var digitalCallList = digitalVisitService.findByParams(valueMap)
        var newList = mutableListOf<DigitalVisit>()
        try {
            digitalCallList.forEach{
                it.isActive = false
                newList.add(digitalVisitService.update(it))
            }
            return newList
        }catch (e: Exception){
            throw e
        }
    }

    fun deactivateVisitInputs(attendeeId: String, employeeId: String): List<VisitInputs>{
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("vinpt_attendee_id",attendeeId)
        var inputList = visitInputsService.findByParams(valueMap)
        var newList = mutableListOf<VisitInputs>()
        try {
            inputList.forEach{
                it.isActive = false
                newList.add(visitInputsService.inwardInputs(it,employeeId))
            }
        }catch (e: Exception){
            throw e
        }
        return newList
    }

    fun deactivateMarketingActivity(attendeeId: String): List<VisitMarketingActivity>{
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("mract_attendee_id",attendeeId)
        var activities = visitMarketingActivityService.findByParams(valueMap)
        var newList = mutableListOf<VisitMarketingActivity>()
        activities.forEach{
            it.isActive = false
            newList.add(visitMarketingActivityService.update(it))
        }
        return newList
    }


    fun mapToAttendee(syncDTO: SyncingVisitDTO, dailyVisitAttendee: DailyVisitAttendee, yyyyMm: Int, planId: SquerId): DailyVisitAttendee{
        dailyVisitAttendee.plan = planId
        syncDTO.coordinates?.let {
            dailyVisitAttendee.longitude = syncDTO.coordinates!!.split(",")[0]
            dailyVisitAttendee.latitude = syncDTO.coordinates!!.split(",")[1]
        }

        syncDTO.customerId?.let {
            dailyVisitAttendee.customer = NamedSquerId(syncDTO.customerId!!, "")
        }
        dailyVisitAttendee.activityType = NamedSquerId(syncDTO.activityType!!,"")
        syncDTO.activityTypeId?.let {
            dailyVisitAttendee.activityTypeId = NamedSquerId(syncDTO.activityTypeId!!,"")
        }
        dailyVisitAttendee.duration = syncDTO.duration
        dailyVisitAttendee.yyyyMm = yyyyMm
        dailyVisitAttendee.yyyyMmDd = syncDTO.yyyyMmDd
        dailyVisitAttendee.location = NamedSquerId(syncDTO.locationId!!,"")
        dailyVisitAttendee.employee = NamedSquerId(syncDTO.employeeId!!,"")
        dailyVisitAttendee.isPlanned = syncDTO.isPlanned
        dailyVisitAttendee.isReported = syncDTO.isReported
        dailyVisitAttendee.isJoint = syncDTO.isJoint
        dailyVisitAttendee.isRcpaDone = syncDTO.isRcpaDone
        dailyVisitAttendee.isVideoShown = syncDTO.isVideoShown
        dailyVisitAttendee.visitRecordedTime = syncDTO.visitRecordTime
        syncDTO.visitTypeId?.let {
            dailyVisitAttendee.visitType = NamedSquerId(syncDTO.visitTypeId!!,"")
        }
        dailyVisitAttendee.remarks = syncDTO.remarks
        dailyVisitAttendee.isActive = syncDTO.isActive

        syncDTO.joineeReferenceId?.let {
            dailyVisitAttendee.joineeReference = SquerId(syncDTO.joineeReferenceId!!)
        }
        return dailyVisitAttendee
    }

    fun mapToRcpa(rcpaDto: SyncingRcpaDTO, rcpa: VisitRcpa): VisitRcpa{
        var brandId: String? = null
        var productId: String? = null
        var brandProductMap = mutableMapOf<String,String>()

        if(rcpaDto.itemId!!.subSequence(0,5) == "brand"){
            brandId = rcpaDto.itemId!!
            productId = null
        }else if(rcpaDto.itemId!!.subSequence(0,5) == "prcdt"){
            if(brandProductMap.containsKey(rcpaDto.itemId)){
                brandId = brandProductMap[rcpaDto.itemId]
                productId = rcpaDto.itemId
            }else {
                var product = productService.findById(rcpaDto.itemId!!)
                brandId = product.brand!!.id
                productId = product.id!!.id
                brandProductMap.put(productId,brandId)
            }
        }
        rcpa.attendee = SquerId(rcpaDto.attendeeId!!)
        rcpa.chemist = NamedSquerId(rcpaDto.chemistId!!,"")
        rcpa.doctor = NamedSquerId(rcpaDto.doctorId!!,"")
        rcpa.brand = NamedSquerId(brandId!!,"")
        productId?.let{rcpa.product = NamedSquerId(productId,"")}
        rcpa.quantity = rcpaDto.quantity
        rcpa.rxn = rcpaDto.rxn
        rcpa.value = rcpaDto.value
        rcpaDto.competitionQuantity?.let { rcpa.competitionQuantity = rcpaDto.competitionQuantity }
        rcpaDto.competitionRxn?.let { rcpa.competitionRxn = rcpaDto.competitionRxn }
        rcpaDto.competitionValue?.let { rcpa.competitionValue = rcpaDto.competitionValue }
        rcpa.type = NamedSquerId(rcpaDto.typeId!!,"")
        rcpa.isActive = true
        return rcpa
    }

    fun mapDetailing(detailingDTO: SyncingDetailingDTO, detailing: VisitDetailing): VisitDetailing{
        detailing.attendee = SquerId(detailingDTO.attendeeId!!)
        detailing.sequence = detailingDTO.sequence
        detailing.brand = NamedSquerId(detailingDTO.brandId!!,"")
        detailingDTO.messageTypeId?.let {
            detailing.messageType = NamedSquerId(detailingDTO.messageTypeId!!,"")
        }
        detailing.prescriptionLevel = detailingDTO.prescriptionLevel
        detailing.isActive = true
        return detailing
    }

    fun mapDigitalCallData(syncingDigitalCallDataDTO: SyncingDigitalCallDataDTO, digitalCallDTO: DigitalVisit ): DigitalVisit{
        digitalCallDTO.attendee = SquerId(syncingDigitalCallDataDTO.attendeeId!!)
        digitalCallDTO.isActive = syncingDigitalCallDataDTO.isActive
        digitalCallDTO.visitMode = NamedSquerId(syncingDigitalCallDataDTO.visitModeId!!,"")
        digitalCallDTO.duration = syncingDigitalCallDataDTO.duration
        digitalCallDTO.templateId = SquerId(syncingDigitalCallDataDTO.templateId!!)
        digitalCallDTO.startTime = Date(syncingDigitalCallDataDTO.startTime!!)
        return digitalCallDTO
    }

    fun mapInputData(syncingInputDTO: SyncingInputDTO, visitInputs: VisitInputs): VisitInputs{
        visitInputs.attendee = SquerId(syncingInputDTO.attendeeId!!)
        visitInputs.input = NamedSquerId(syncingInputDTO.inputId!!,"")
        visitInputs.quantity = syncingInputDTO.quantity
        visitInputs.isActive = true
        return visitInputs
    }

    fun markJoinee(attendeeId: String, statusId:String): Boolean{
        try {
            var valueMap = mutableMapOf<String, Any>()
            valueMap.put("dtvje_attendee_id", attendeeId)
            var joineeList = visitJoineeService.findByParams(valueMap)
            joineeList.forEach {
                it.status = NamedSquerId(statusId, "")
                visitJoineeService.update(it)
            }
            return true
        }catch (e: Exception){
            throw e
        }
    }

    fun saveCoordinates(doctorCoordinatesDTO: MutableList<DoctorCoordinatesDTO>): Boolean {
        return true;
    }
}