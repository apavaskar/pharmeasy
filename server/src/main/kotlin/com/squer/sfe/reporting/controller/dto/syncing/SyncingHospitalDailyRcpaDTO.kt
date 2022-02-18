package com.squer.sfe.reporting.controller.dto.syncing

class SyncingHospitalDailyRcpaDTO {
    var entityId: String? = null
    var hospitalId: String? = null
    var doctorId: String? = null
    var doctorName: String? = null
    var locationId: String? = null
    var employeeId: String? = null
    var rcpaDate: Int? = null
    var emrokIvPatients: Int? = null
    var emrokOPatients: Int? = null
    var bothPatients: Int? = null
    var externalCode: String? = null
    var actionTaken: Char? = null
}