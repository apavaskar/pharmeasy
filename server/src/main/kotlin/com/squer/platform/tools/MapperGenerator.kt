package com.squer.platform.tools

import com.squer.platform.business.entity.EntityMeta
import com.squer.platform.persistence.SquerQuery
import org.apache.velocity.Template
import org.apache.velocity.VelocityContext
import org.apache.velocity.app.VelocityEngine
import org.reflections.Reflections
import java.io.*
import java.util.*


class MapperGenerator {
    companion object{
        val configDb = "jdbc:postgresql://localhost:5432/nuConfig"
        val appDb = "jdbc:postgresql://localhost:5432/sns?testchs"
        val notifications = "jdbc:postgresql://localhost:5432/notifications"
    }

    fun generate(className: String, db: String, srcPath: String): String {
        try {
            var fieldList = mutableMapOf<String, String>()
            var current = Class.forName(className).kotlin.java
            var entityColumnList = mutableListOf<EntityColumn>()
            val meta = current.getAnnotation(EntityMeta::class.java)
            val tableName = meta.tableName
            var tmpClass = current
            while (tmpClass.superclass != null) {
                val fields = tmpClass.declaredFields
                fields.forEach { it ->
                    println("==================================> " + it.name + "," + it.type.simpleName)
                    if (!fieldList.containsKey(it.name.toLowerCase())) {
                        var entityColumn: EntityColumn = EntityColumn()
                        entityColumn.propertyName = it.name
                        entityColumn.columnName = getTableColumnName(it.name, meta.prefix,it.type.simpleName.equals("boolean"))
                        entityColumn.columnType = it.type.simpleName
                        entityColumnList.add(entityColumn)
                        fieldList.put(it.name.toLowerCase(), it.name)
                    }
                }
                tmpClass = tmpClass.superclass
            }
            //generate sql
            val dbFileName = "/Users/shriramgosavi/codebase/nuSfe/nu-sfe/db/${getPackageName(current.packageName)}.sql"
            var file = File(dbFileName)
            if(!file.exists()) {
                file.createNewFile()
            }
            var dml = generateCreateTable(meta,entityColumnList,tableName)
            File(dbFileName).appendText("\n\n$dml");
            println("=============DML GENERATED=============")

            //generate mapper
            var mapperText = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n" +
                     "<!DOCTYPE mapper\n" +
                     "        PUBLIC \"-//mybatis.org//DTD Mapper 3.0//EN\"\n" +
                     "        \"http://mybatis.org/dtd/mybatis-3-mapper.dtd\">\n" +
                     "<mapper namespace=\"${current.simpleName}-mapper\">\n" +
                     "    <cache />";

             mapperText = mapperText + "\n\n" + generateSelect(meta, entityColumnList, tableName, entityClassName = className)
             mapperText = mapperText + "\n\n" + generateInsert(meta, entityColumnList, tableName = tableName)
             mapperText = mapperText + "\n\n" + generateUpdate(meta, entityColumnList, tableName = tableName)
             mapperText = mapperText + "\n\n" + generateDelete(meta, tableName)

             mapperText += "\n\n</mapper>"

             val filePath = "${srcPath}/main/resources/mapper/${current.simpleName.toLowerCase()}-mapper.xml"
             file = File(filePath)
             if(file.exists()){
                 file.delete();
             }
             file.createNewFile()
             file.writeText(mapperText)
             println("=============MAPPER GENERATED=============")

             //generate query name
             var enumName = "${getPackageName(current.packageName).capitalize()}QueryName"
             var enumFileName = "${srcPath}/main/kotlin/${getPackagePath(current.packageName,"/")}/${enumName}.kt"
             file = File(enumFileName)

             if(!file.exists()){
                 file.createNewFile()
                 file.writeText("package ${getPackagePath(current.packageName,".")}\n\n" +
                         "import com.squer.platform.persistence.AdhocQueryName\n" +
                         "import com.squer.platform.persistence.SquerQuery\n" +
                         "enum class ${enumName} (override val query: AdhocQueryName): SquerQuery {\n"+
                         "${meta.prefix.toUpperCase()}_SELECT (AdhocQueryName(\"${meta.prefix.toLowerCase()}_select\")),\n"+
                         "${meta.prefix.toUpperCase()}_INSERT (AdhocQueryName(\"${meta.prefix.toLowerCase()}_insert\")),\n"+
                         "${meta.prefix.toUpperCase()}_UPDATE (AdhocQueryName(\"${meta.prefix.toLowerCase()}_update\")),\n"+
                         "${meta.prefix.toUpperCase()}_DELETE (AdhocQueryName(\"${meta.prefix.toLowerCase()}_delete\")),\n"+
                         "/*===ADD TO FILE===*/\n" +
                         ";}")
             }else {
                 var namesToAdd = mutableListOf<String>()
                 namesToAdd.add("${meta.prefix.toUpperCase()}_SELECT")
                 namesToAdd.add("${meta.prefix.toUpperCase()}_INSERT")
                 namesToAdd.add("${meta.prefix.toUpperCase()}_UPDATE")
                 namesToAdd.add("${meta.prefix.toUpperCase()}_DELETE")

                 val reflections = Reflections("com.squer")
                 val subTypes = reflections.getSubTypesOf(SquerQuery::class.java)
                 subTypes.forEach{
                     if(it.simpleName == enumName){
                         val enumClz = Class.forName(it.kotlin.qualifiedName)
                         val constants = enumClz.enumConstants as Array<SquerQuery>
                         constants.forEach { ct ->
                             if(namesToAdd.contains(ct.toString())){
                                 namesToAdd.remove(ct.toString());
                             }
                         }
                     }
                 }

                 var line = ""
                 File(enumFileName).readLines().forEach {
                     if(it == "/*===ADD TO FILE===*/"){
                          namesToAdd.forEach{ nm ->
                              line += nm+" (AdhocQueryName(\"${nm.toLowerCase()}\")),"+"\n"
                          }
                     }
                     line += it+"\n"
                 }
                 val writer = BufferedWriter(FileWriter(enumFileName))
                 writer.write(line)
                 writer.close()
             }
             println("=============QUERY ENUM GENERATED=============")

            //generate service
             val ve = VelocityEngine()
             val p = Properties()
             ve.setProperty("resource.loader", "file");
             ve.setProperty("file.resource.loader.class", "org.apache.velocity.runtime.resource.loader.FileResourceLoader");
             ve.setProperty("file.resource.loader.path", "src/main/kotlin/com/squer/platform/tools/templates");
             ve.init(p)

             val serviceTemplate : Template = ve.getTemplate("serviceTemplate.vm")
             val stContext = VelocityContext()
             stContext.put("servicePackageName", "${getPackagePath(current.packageName,".")}.service");
             stContext.put("queryEnumPath","${getPackagePath(current.packageName,".")}.${enumName}")
             stContext.put("entityPath",className)
             stContext.put("entityName", current.simpleName)
             stContext.put("serviceName", "${current.simpleName}Service")
             stContext.put("searchQuery", "$enumName.${meta.prefix.toUpperCase()}_SELECT.query")
             stContext.put("entityId", "${meta.prefix}_id")
             val stWriter = StringWriter()
             serviceTemplate.merge(stContext, stWriter)
             file = File("${srcPath}/main/kotlin/${getPackagePath(current.packageName,"/")}/service/${current.simpleName}Service.kt")
             if(!file.exists()){
                 file.createNewFile()
                 file.writeText(stWriter.toString())
             }
             println("=============SERVICE GENERATED=============")

             //generate controller
             val controllerTemplate : Template = ve.getTemplate("controllerTemplate.vm")
             val ctContext = VelocityContext()
             ctContext.put("controllerPackageName","${getPackagePath(current.packageName,".")}.controller")
             ctContext.put("entityPath",className)
             ctContext.put("servicePath","${getPackagePath(current.packageName,".")}.service.${current.simpleName}Service")
             ctContext.put("requestName","${current.simpleName.toLowerCase()}")
             ctContext.put("controllerName","${current.simpleName}Controller")
             ctContext.put("serviceName","${current.simpleName}Service")
             ctContext.put("entityName", current.simpleName)
             val ctWriter = StringWriter()
             controllerTemplate.merge(ctContext, ctWriter)
             file = File("${srcPath}/main/kotlin/${getPackagePath(current.packageName,"/")}/controller/${current.simpleName}Controller.kt")
             if(!file.exists()){
                 file.createNewFile()
                 file.writeText(ctWriter.toString())
             }
             println("=============CONTROLLER GENERATED=============")
        } catch (e: Exception) {
            e.printStackTrace()
            System.err.println(e.javaClass.name + ": " + e.message)
            System.exit(0)
        }
        return ""
    }

    private fun getPackageName(path: String): String {
        var paths = path.split(".")
        return paths.get(paths.size-2)
    }

    private fun getPackagePath(path: String, splitBy: String): String {
        var paths = path.split(".")
        var absPath = "";
        var i = 0;
        paths.forEach { p ->
            if(i < paths.size-1){
                if(absPath=="")
                    absPath = p
                else
                    absPath = absPath+splitBy+p
            }
            i= i+1
        }
        return absPath;
    }

    private fun getTableColumnName(str: String, prefix: String, isBool: Boolean): String {
        var str = str
        val regex = "([a-z])([A-Z]+)"
        val replacement = "$1_$2"
        str = str
            .replace(
                regex.toRegex(), replacement
            )
            .toLowerCase()

        if(isBool && !str.startsWith("is"))
            str = "is_${str}"

        return "${prefix}_${str}".toUpperCase()
    }

    private fun generateCreateTable(meta: EntityMeta, entityColumnList: List<EntityColumn>, tableName: String): String {
        var dml = "CREATE TABLE ${'$'}{schemaName}.$tableName(\n"
        var idx = 0
        entityColumnList.forEach{
            var addField = false;
            if(it.columnType == "String") {
                dml += "${it.columnName.toLowerCase()} varchar(50)"
                addField = true
            } else if(it.columnType == "Date") {
                dml += "${it.columnName.toLowerCase()} TIMESTAMP"
                addField =true
            }else if(it.columnType == "NamedSquerId" || it.columnType == "SquerId") {
                if(it.columnName.toLowerCase() == "${meta.prefix}_id"){
                    dml += "${it.columnName.toLowerCase()} char(37) PRIMARY KEY"
                }else {
                    dml += "${it.columnName.toLowerCase()}_id char(37)"
                }
                addField =true
            }
            else if(it.columnType.toLowerCase() == "boolean") {
                dml += "${it.columnName.toLowerCase()} BOOLEAN"
                addField =true
            }
            else if(it.columnType.toLowerCase() == "long") {
                dml += "${it.columnName.toLowerCase()} BIGINT"
                addField =true
            }else if(it.columnType.toLowerCase() == "int" || it.columnType.toLowerCase() == "integer") {
                dml += "${it.columnName.toLowerCase()} INTEGER"
                addField =true
            }else if(it.columnType.toLowerCase() == "double") {
                dml += "${it.columnName.toLowerCase()} DOUBLE PRECISION"
                addField =true
            }else if(it.columnType.toLowerCase() == "Long") {
                dml += "${it.columnName.toLowerCase()} BIGINT"
                addField =true
            }else{
                println("=================================================")
                println("=================================================")
                println("${it.columnName} NOT ADDED")
                println("=================================================")
                println("=================================================")
            }

            idx += 1
            if(addField) {
                if (idx < entityColumnList.size) {
                    dml += ",\n"
                } else {
                    dml += "\n);"
                }
            }
        }
        return dml
    }

    private fun generateSelect(meta: EntityMeta, entityColumnList: List<EntityColumn>, tableName: String, entityClassName: String): String {
        var columnNames = mutableListOf<String>()
        var named = "\t\t<id property=\"id\" column=\"${meta.prefix.toUpperCase()}_ID\" />"+"\n"
        entityColumnList.forEach{
            if(it.columnType != "List") {
                if (!it.propertyName.equals("id")) {
                    if(it.columnType == "NamedSquerId" || it.columnType == "SquerId") {
                        named = named + "\t\t\t<result property=\"${it.propertyName}\" column=\"${it.columnName}_ID\" />" + "\n"
                        columnNames.add("${it.columnName}_ID")
                    }else {
                        named = named + "\t\t\t<result property=\"${it.propertyName}\" column=\"${it.columnName}\" />" + "\n"
                        columnNames.add(it.columnName)
                    }
                }else
                    columnNames.add(it.columnName)
            }
        }

        val query = """
            <select id="${meta.prefix.toLowerCase()}_select" resultMap="${meta.prefix}Map">
                SELECT ${columnNames.joinToString(", ")} FROM ${'$'}{schemaName}.${tableName}
                <include refid="base.where_statement"></include>
            </select>
            <resultMap id="${meta.prefix}Map" type="$entityClassName" autoMapping="true">
            $named            
            </resultMap>         
        """

        return query

    }

    private fun generateInsert(meta: EntityMeta, entityColumnList: List<EntityColumn>, tableName: String): String {
        val parameterNames = mutableListOf<String>()
        var columnNames = mutableListOf<String>()

        entityColumnList.forEach {
            if(it.columnType != "List") {

                if (it.columnType == "NamedSquerId" || it.columnType == "SquerId") {
                    if (it.propertyName.equals("id")) {
                        parameterNames.add("#{entity.${it.propertyName}}")
                        columnNames.add(it.columnName)
                    }else {
                        parameterNames.add("#{entity.${it.propertyName}.id}")
                        columnNames.add("${it.columnName}_ID")
                    }
                } else {
                    parameterNames.add("#{entity.${it.propertyName}}")
                    columnNames.add(it.columnName)
                }
            }

        }
        val query = """
            <insert id="${meta.prefix.toLowerCase()}_insert" >
                INSERT INTO ${'$'}{schemaName}.${tableName}(${columnNames.joinToString(", ")})
                VALUES (${parameterNames.joinToString(", ")})
            </insert>    
        """
        return query
    }

    private fun generateUpdate(meta: EntityMeta, entityColumnList: List<EntityColumn>, tableName: String): String {
        val parameterNames = mutableListOf<String>()

        entityColumnList.forEach {
            if (it.propertyName.toLowerCase() != "id" &&
                it.propertyName.toLowerCase() != "createdby" &&
                it.propertyName.toLowerCase() != "createdon" &&
                it.columnType != "List"
            ) {
                if(it.columnType == "NamedSquerId" || it.columnType == "SquerId") {
                    parameterNames.add("${it.columnName}_id = #{entity.${it.propertyName}.id}")
                } else {
                    parameterNames.add("${it.columnName} = #{entity.${it.propertyName}}")
                }
            }
        }
        val query = """
            <update id="${meta.prefix.toLowerCase()}_update" >
                UPDATE ${'$'}{schemaName}.${tableName} set ${parameterNames.joinToString (", " )} 
                WHERE ${meta.prefix.toUpperCase()}_ID = #{entity.id} 
            </update>    
        """
        return query
    }

    private fun generateDelete(meta: EntityMeta, tableName: String): String {
        val query = """
            <delete id="${meta.prefix.toLowerCase()}_delete" >
                DELETE FROM  ${'$'}{schemaName}.${tableName} <include refid="base.delete_where_statement"></include> 
            </delete>    
        """
        return query
    }

}

class EntityColumn {
    var propertyName: String = ""
    var columnName: String = ""
    var columnType: String = ""
}