package com.squer.sfe.edetailing.controller

import com.squer.sfe.edetailing.entity.DetailingFile
import com.squer.sfe.edetailing.service.DetailingFileService
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.services.exception.SquerException
import com.squer.sfe.edetailing.controller.dto.DetailingFileDTO
import com.squer.sfe.edetailing.controller.dto.DetailingFileDataDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.io.File
import kotlin.jvm.Throws

@RequestMapping("/detailingfile")
@RestController
class DetailingFileController {
    @Autowired
    lateinit var repository: SquerRepository

    @Autowired
    lateinit var entityService: DetailingFileService

    @Throws(SquerException::class)
    @GetMapping("/{id}")
    fun getById(@PathVariable id: String): DetailingFile {
        return entityService.findById(id)
    }

    @Throws(SquerException::class)
    @PutMapping("/create")
    fun createEntity(@RequestBody entity: DetailingFile): DetailingFile {
        return entityService.create(entity)
    }

    @Throws(SquerException::class)
    @PutMapping("/update")
    fun updateEntity(@RequestBody entity: DetailingFile): DetailingFile {
        return entityService.update(entity)
    }

    @Throws(SquerException::class)
    @GetMapping("/by-brand/{brandId}")
    fun getFilesByBrand(@PathVariable brandId: String): List<DetailingFileDataDTO> {
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("dtlfl_brand_id",brandId)
        valueMap.put("dtlfl_is_active",true)
        var fileList = entityService.findByParams(valueMap)
        var dtoList = mutableListOf<DetailingFileDataDTO>()
        fileList.forEach{
            dtoList.add(
                DetailingFileDataDTO(
                    it.brand!!.id,
                    it.id!!.id,
                    it.title,
                    it.sequence,
                    it.discription
                )
            )
        }
        return dtoList;
    }

    @Throws(SquerException::class)
    @GetMapping("/for-brand")
    fun getFilesByBrand(): List<DetailingFileDataDTO> {
        var valueMap = mutableMapOf<String,Any>()
        valueMap.put("dtlfl_is_active",true)
        var fileList = entityService.findByParams(valueMap)
        var dtoList = mutableListOf<DetailingFileDataDTO>()
        fileList.forEach{
            dtoList.add(
                DetailingFileDataDTO(
                    it.brand!!.id!!,
                    it.id!!.id,
                    it.title,
                    it.sequence,
                    it.discription,
                )
            )
        }
        return dtoList;
    }

    @Throws(SquerException::class)
    @GetMapping("/by-file-id/{fileId}")
    fun getFilesByFileId(@PathVariable fileId: String): DetailingFileDTO {
        var file = getById(fileId);
        return DetailingFileDTO (
            File(file.htmlFilePath!!).inputStream().bufferedReader().use { it.readText() },
            fileToString(file.thumbnailFilePath!!)
        )
    }

    fun fileToString(filePath: String): ByteArray {
        var file = File(filePath)
        return file.readBytes()
    }
}