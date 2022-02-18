package com.squer.sfe.inventory.service

import com.squer.sfe.inventory.InventoryQueryName
import com.squer.sfe.inventory.entity.InventoryStock
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.text.DateFormat
import java.text.SimpleDateFormat
import java.util.*

@Service
class InventoryStockService {

    @Autowired
    lateinit var repository: SquerRepository


    fun findById(id: String): InventoryStock {
        val searchCriteria = SearchCriteria(InventoryQueryName.INVST_SELECT.query)
        searchCriteria.addCondition("invst_id", id)
        return repository.find(searchCriteria).filterIsInstance<InventoryStock>().first()
    }

    fun create(entity: InventoryStock): InventoryStock {
        return repository.create(entity) as InventoryStock
    }

    fun update(entity: InventoryStock): InventoryStock {
        return repository.update(entity) as InventoryStock
    }

    fun findByParams(valueMap: Map<String,Any>): List<InventoryStock> {
            val searchCriteria = SearchCriteria(InventoryQueryName.INVST_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<InventoryStock>()
    }

    fun distributeStock(employeeId: String, itemId: String, quantity: Int): Boolean{
        try {
            var balanceQuantity = quantity
            var yyyyMMDDFormat: DateFormat = SimpleDateFormat("yyyyMMdd")
            var calendar = Calendar.getInstance()
            calendar.time = Date()

            var stock = findById(itemId)
            stock.balance = stock.balance!! - quantity
            stock.distributed = stock.distributed!! + quantity
            update(stock)

            /*var searchCriteria = SearchCriteria(InventoryQueryName.INVENTORY_STOCK_SELECT.query)
            searchCriteria.addCondition("employee", employeeId)
            searchCriteria.addCondition("item", itemId)
            searchCriteria.addCondition("currentDate", yyyyMMDDFormat.format(calendar.time).toInt())
            var stockList = repository.find(searchCriteria).filterIsInstance<InventoryStock>()

            stockList.forEach{
                if(balanceQuantity > 0) {
                    var assignQuantity = 0
                    if (it.balance!! >= quantity) {
                        assignQuantity = quantity
                        balanceQuantity = 0
                    } else {
                        assignQuantity = it.balance!!
                        balanceQuantity = quantity - it.balance!!
                    }
                    it.distributed = it.distributed!! + assignQuantity
                    it.balance = it.quantityAdded!! - it.distributed!!
                    repository.update(it)
                }
            }*/

            return true
        }catch (e: Exception){
            throw e
        }
    }

    fun inwardStock(employeeId: String, itemId: String, quantity: Int): Boolean{
        try{
            var yyyyMMDDFormat: DateFormat = SimpleDateFormat("yyyyMMdd")
            var calendar = Calendar.getInstance()
            calendar.time = Date()
            var balanceQuantity = quantity

            var stock = findById(itemId)
            stock.balance = stock.balance!! + quantity
            stock.distributed = stock.distributed!! - quantity
            update(stock)
            /*var searchCriteria = SearchCriteria(InventoryQueryName.INVENTORY_STOCK_SELECT.query)
            searchCriteria.addCondition("employee", employeeId)
            searchCriteria.addCondition("item", itemId)
            searchCriteria.addCondition("currentDate", yyyyMMDDFormat.format(calendar.time).toInt())
            var stockList = repository.find(searchCriteria).filterIsInstance<InventoryStock>().reversed()

            stockList.forEach{
                if(balanceQuantity > 0){
                    if(it.quantityAdded!! >= (it.balance!! + balanceQuantity)){
                        it.balance = it.balance!! + balanceQuantity
                        it.distributed = it.quantityAdded!! - it.balance!!
                        balanceQuantity = 0
                    }else{
                        var d = it.distributed!!
                        it.distributed = balanceQuantity - it.distributed!!
                        it.balance = it.quantityAdded!! - it.distributed!!
                        balanceQuantity -= d
                    }
                    repository.update(it)
                }
            }*/
            return true
        }catch (e: Exception){
            throw e
        }
    }
}