package com.squer.platform.config.service

import com.squer.platform.business.entity.SquerId
import com.squer.platform.config.ConfigQueryName
import com.squer.platform.config.entity.Configurations
import com.squer.platform.config.entity.dto.ConfigDTO
import com.squer.platform.config.entity.enum.ConfigTypeEnum
import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.sfe.common.entity.Location
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ConfigurationsService {

    @Autowired
    lateinit var repository: SquerRepository

    fun findById(id: String): Configurations {
        val searchCriteria = SearchCriteria(ConfigQueryName.CONFG_SELECT.query)
        searchCriteria.addCondition("confg_id", id)
        return repository.find(searchCriteria).filterIsInstance<Configurations>().first()
    }

    fun create(entity: Configurations): Configurations {
        return repository.create(entity) as Configurations
    }

    fun update(entity: Configurations): Configurations {
        return repository.update(entity) as Configurations
    }

    fun findByParams(valueMap: Map<String,Any>): List<Configurations> {
            val searchCriteria = SearchCriteria(ConfigQueryName.CONFG_SELECT.query)
            valueMap.forEach {
                searchCriteria.addCondition(it.key, it.value)
            }
            return repository.find(searchCriteria).filterIsInstance<Configurations>()
    }

    fun getMyConfig(locationId: String, configNameId: String): List<ConfigDTO> {
        val searchCriteria = SearchCriteria(ConfigQueryName.MY_CONFIG_SELECT.query)
        searchCriteria.addCondition("locationId", locationId)

        if(configNameId!="")
            searchCriteria.addCondition("configNameId", configNameId)

        val configList = repository.find(searchCriteria).filterIsInstance<Configurations>()
        val configListMap = configList.associateBy ({it.id!!.id}, {it})
        val dtoList = mutableListOf<ConfigDTO>()
        configList.forEach{
            if(it.configType!!.id == ConfigTypeEnum.FOR_ME.type) {
                if( it.location!!.id == locationId)
                     dtoList.add(ConfigDTO(it.configName!!.name,it.value))
            }else{
                    dtoList.add(ConfigDTO(it.configName!!.name,it.value))
            }
        }

        val myLocation = repository.restore(SquerId(locationId)) as Location
        val divisionId = myLocation.division!!.id
        val criteriaByDivision = SearchCriteria(ConfigQueryName.CONFG_SELECT.query)
        criteriaByDivision.addCondition("confg_location_id", divisionId)
        val divisionConfigs = repository.find(criteriaByDivision).filterIsInstance<Configurations>()
        divisionConfigs.forEach {
            if (!configListMap.containsKey(it.id!!.id)) {
                dtoList.add(ConfigDTO(it.configName!!.name, it.value))
            }
        }
        return dtoList
    }
}