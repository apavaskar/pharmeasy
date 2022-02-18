package com.squer.consolidation.controller

import com.squer.platform.ServiceLocator
import com.squer.platform.jms.MessagePublisher
import com.squer.platform.jms.MessageWrapper
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.ApiDate
import com.squer.sfe.common.CommonQueryName
import com.squer.sfe.common.entity.Location
import com.squer.sfe.reporting.ConsolidationQueueNameEnum
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RequestMapping("/dailyeffort")
@RestController
class DailyEffortRowController {
    @Autowired
    lateinit var publisher: MessagePublisher

    @Autowired
    lateinit var serviceLocator: ServiceLocator

    @Autowired
    lateinit var repository: SquerRepository

    @PostMapping("/consolidate/{locationId}/{date}")
    fun consolidate(@PathVariable locationId: String, @PathVariable date: String) {
        val message = MessageWrapper()
        message.key = mutableMapOf("locationId" to locationId, "date" to ApiDate(date).date!!)
        message.tenantId = serviceLocator.getPrincipal()!!.tenantId
        publisher.send(ConsolidationQueueNameEnum.EffortConsolidationQueue, message)
    }

    @PostMapping("/consolidate/{yearMonth}/{fromDate}/{toDate}")
    fun consolidate(@PathVariable yearMonth: String, @PathVariable fromDate: String, @PathVariable toDate: String) {
        val locationCriteria = SearchCriteria(CommonQueryName.LOCAT_SELECT.query)
        locationCriteria.addCondition("locat_is_active", true)
        locationCriteria.addCondition("locat_type_id", "loctt00000000000000000000000000000003")
        val locations = repository.find(locationCriteria) as List<Location>
        val toDateInt = toDate.toInt()
        locations.forEach { location ->
            println("Location being consolidated:" + location.id!!.id)
            var fromDateInt = fromDate.toInt()
            while(fromDateInt <= toDateInt) {
                val message = MessageWrapper()
                val date = yearMonth + "-" + fromDateInt.toString().padStart(2,'0')
                message.key = mutableMapOf("locationId" to location.id!!.id, "date" to ApiDate(date).date!!)
                message.tenantId = serviceLocator.getPrincipal()!!.tenantId
                publisher.send(ConsolidationQueueNameEnum.EffortConsolidationQueue, message)
                fromDateInt ++
            }
        }
    }

}