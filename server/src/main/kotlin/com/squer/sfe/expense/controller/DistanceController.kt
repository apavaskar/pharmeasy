package com.squer.sfe.expense.controller

import com.squer.sfe.expense.entity.Distance
import com.squer.sfe.expense.service.DistanceService
import com.squer.platform.business.entity.SquerId
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.expense.ExpenseQueryName
import com.squer.sfe.expense.dto.DistanceDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import kotlin.jvm.Throws

@RequestMapping("/distance")
@RestController
class DistanceController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: DistanceService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): Distance {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PostMapping("/create")
    fun createEntity(@RequestBody entity: Distance): Distance {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: Distance): Distance {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-town/{fromTown}/{toDown}")
    fun getByTowns(@PathVariable fromTown: String, @PathVariable toDown: String): List<Distance> {
        var searchCriteria = SearchCriteria(ExpenseQueryName.EXPENSE_DISTANCE_SELECT.query)
        searchCriteria.addCondition("townStr", "$fromTown~$toDown")
        return  repository.find(searchCriteria).filterIsInstance<Distance>()
    }

    @Throws(SquerException::class)
    @PostMapping("/by-town-list")
    fun getByTownList(@RequestBody towns: List<String>): List<DistanceDTO> {
        var cnt=0
        var dtoList = mutableListOf<DistanceDTO>()
        towns.forEach {
            if(cnt < towns.size-1) {
                var searchCriteria = SearchCriteria(ExpenseQueryName.EXPENSE_DISTANCE_SELECT.query)
                searchCriteria.addCondition("townStr", towns[cnt]+"~"+towns[cnt+1])
                var distances = repository.find(searchCriteria).filterIsInstance<Distance>()
                if(distances.isEmpty()){
                    dtoList.add(DistanceDTO(towns[cnt],towns[cnt+1],null))
                }else {
                    var distance = distances[0]
                    dtoList.add(DistanceDTO(towns[cnt],towns[cnt+1], distance.kms))
                }
            }
            cnt++
        }
        return dtoList
    }

    @Throws(SquerException::class)
    @PutMapping("/update-distance/{distanceId}/{kms}")
    fun updatedDistance (@PathVariable distanceId: String, @PathVariable kms: Double): Boolean {
        try {
            var distance = repository.restore(SquerId(distanceId)) as Distance
            distance.kms = kms
            repository.update(distance)
            return true
        }catch (e: Exception){
            e.printStackTrace()
            return false
        }
    }

}