package com.squer.sfe.reporting.controller.dto.syncing

import kotlin.properties.Delegates

class DoctorCoordinatesDTO {
    lateinit var doctorId: String
    var latitute by Delegates.notNull<Double>()
    var longitude by Delegates.notNull<Double>()
    var isPrimary: Boolean = false
}