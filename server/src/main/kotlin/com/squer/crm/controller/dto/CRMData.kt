package com.squer.crm.controller.dto

import com.squer.crm.entity.CRMDoctorStages
import com.squer.crm.entity.CRMDoctorStatus

class CRMData {
    lateinit var rawData: List<CRMDoctorStages>
    lateinit var doctorStatus: List<CRMDoctorStatus>
}