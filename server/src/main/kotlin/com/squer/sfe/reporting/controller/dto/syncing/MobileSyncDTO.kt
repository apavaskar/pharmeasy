package com.squer.sfe.reporting.controller.dto.syncing

class MobileSyncDTO {
    var visits = listOf<SyncingVisitDTO>()
    var marketingActivities = listOf<SyncingMarketingActivityDTO>()
    var hospitalRcpaList = listOf<SyncingHospitalRcpaDTO>()
    var hospitalDailyRcpaList = listOf<SyncingHospitalDailyRcpaDTO>()
    var doctorCoordinates = listOf<DoctorCoordinatesDTO>()
}