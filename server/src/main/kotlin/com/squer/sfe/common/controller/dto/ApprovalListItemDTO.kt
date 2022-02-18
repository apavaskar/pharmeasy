package com.squer.sfe.common.controller.dto

class ApprovalListItemDTO {
    lateinit var title: String
    lateinit var data: MutableList<ApprovalObjectDTO>
}

class ApprovalObjectDTO {
    lateinit var instanceId: String
    lateinit var obj: Any
}