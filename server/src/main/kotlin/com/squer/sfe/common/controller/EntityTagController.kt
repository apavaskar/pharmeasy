package com.squer.sfe.common.controller

import com.squer.sfe.common.entity.EntityTagRelation
import com.squer.sfe.common.service.EntityTagService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/entity-tag")
@RestController
class EntityTagController {

    @Autowired
    lateinit var entityTagService: EntityTagService
    fun getObjectsByTag(tagId: String): List<EntityTagRelation> {
        return entityTagService.findOwnersById(tagId)

    }
}