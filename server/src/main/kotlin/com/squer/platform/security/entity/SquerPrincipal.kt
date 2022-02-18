package com.squer.platform.security.entity

data class SquerPrincipal (
    var id: String,
    var username: String,
    var displayName: String,
    var tenantId: String,
    var validUpto: Long,
)