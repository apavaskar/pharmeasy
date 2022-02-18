package com.squer.platform.business.entity

import com.squer.platform.security.entity.SquerPrincipal
import java.util.*
import kotlin.reflect.KClass

class EntityUtil {
    companion object {
        fun getMeta(entity: SquerEntity) =
            entity.javaClass.getAnnotation(EntityMeta::class.java)

        fun getMeta(entityClass: KClass<out SquerEntity>) =
            entityClass.java.getAnnotation(EntityMeta::class.java)

        fun generateId(meta: EntityMeta) = meta.prefix.toLowerCase() + UUID.randomUUID().toString().replace("-","")

        fun generateId(prefix: String) = prefix.toLowerCase() + UUID.randomUUID().toString().replace("-","")

        fun fillEntityForCreate(entity: SquerEntity, meta: EntityMeta, principal: SquerPrincipal?) {
            val id = generateId(meta)
            entity.id = SquerId(id)
            if (entity is AuditableEntity) {
                entity.createdBy = principal!!.id
                entity.updatedBy = principal!!.id
                val now = Date()
                entity.updatedOn = now
                entity.createdOn = now
                entity.staleId = 1
            }
            if (entity is NameAwareEntity) {
                entity.ciName = entity.name.toLowerCase()
            }
        }

        fun fillEntityForUpdate(entity: SquerEntity, meta: EntityMeta, principal: SquerPrincipal?) {
            if (entity is AuditableEntity) {
                entity.updatedBy = principal!!.id
                val now = Date()
                entity.updatedOn = now
                entity.staleId = 1
            }
        }

    }

    fun getEnumValue(enumClassName: String, enumValue: String): Any {
        val enumClz = Class.forName(enumClassName).enumConstants as Array<Enum<*>>
        return enumClz.first { it.name == enumValue }
    }

}

class NoUsableConstructor: Error()

fun makeRandomInstance(clazz: KClass<*>): Any? {
    val constructor = clazz.constructors
        .minBy { it.parameters.size } ?: throw NoUsableConstructor()

    val arguments = constructor.parameters
        .map { it.type.classifier as KClass<*> }
        .map { makeRandomInstance(it) }
        .toTypedArray()

    return constructor.call(*arguments)
}

