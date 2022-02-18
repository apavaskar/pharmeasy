package com.squer.sfe.common.service


interface ApprovalImplementation {
    fun approveReject(id: String, approvalChainInstanceId: String, action: String, comments: String?): Boolean
}