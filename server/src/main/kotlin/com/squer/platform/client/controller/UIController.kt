package com.squer.platform.client.controller

import com.squer.platform.ServiceLocator
import com.squer.platform.appframework.entity.ActionMenu
import com.squer.platform.client.ClientQueryName
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/uicontroller")
@RestController
class UIController {

    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var serviceLocator: ServiceLocator

    @GetMapping("/my-menus/{uiInterface}")
    fun getMyMenus(@PathVariable uiInterface: String): List<ActionMenu> {
        val criteria = SearchCriteria(query = ClientQueryName.MyMenus.query)
        val principal  = serviceLocator.getPrincipal()
        criteria.addCondition(name = "userId", value = principal!!.id )
        criteria.addCondition(name = "uiInterface", value = uiInterface)
        val menus = repository.find(criteria).filterIsInstance<ActionMenu>()
        var parentMenus = menus.filter { it.parentMenuId.id == "" }.sortedBy { it.displayOrder }

        var mapOfParentToChildMenus = mutableMapOf<String, MutableList<ActionMenu>>()
        parentMenus.forEach {mapOfParentToChildMenus.put(it.id!!.id, mutableListOf()) }
        menus.filter { it.parentMenuId.id != ""}.forEach { run{
            var children = mapOfParentToChildMenus.get(it.parentMenuId.id)
            children!!.add(it)
        }}
        parentMenus.forEach {parentMenu ->
            parentMenu.children = mapOfParentToChildMenus[parentMenu.id!!.id]!!.sortedBy { it.displayOrder }.toMutableList()
        }
        return  parentMenus
    }
}