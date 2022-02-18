package com.squer.sfe.leave.controller

import com.squer.sfe.leave.entity.LeaveBalance
import com.squer.sfe.leave.service.LeaveBalanceService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.leave.controller.dto.LeaveBalanceDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/leavebalance")
@RestController
class LeaveBalanceController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: LeaveBalanceService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): LeaveBalance {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: LeaveBalance): LeaveBalance {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: LeaveBalance): LeaveBalance {
        return entityService.update(entity)
    }


    @Throws(SquerException::class)
    @GetMapping("/by-employee/{employeeId}/{leaveType}")
    fun getBalanceForEmployee(@PathVariable employeeId: String, @PathVariable leaveType: String): List<LeaveBalanceDTO> {
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("lvblc_employee_id",employeeId)
        valueMap.put("lvblc_is_latest", true)
        if(leaveType != "0")
            valueMap.put("lvblc_leave_type_id", leaveType)
        var balanceList = entityService.findByParams(valueMap)
        var balanceDtoList = mutableListOf<LeaveBalanceDTO>()
        balanceList.forEach{
            balanceDtoList.add(
                LeaveBalanceDTO(it.leaveType,it.balance)
            )
        }
        return balanceDtoList
    }


}