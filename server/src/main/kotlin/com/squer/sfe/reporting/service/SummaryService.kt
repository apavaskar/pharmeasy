package com.squer.sfe.reporting.service

import com.squer.platform.persistence.repository.SquerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class SummaryService {
    @Autowired
    lateinit var repository: SquerRepository

    fun monthlySummary(yyyyMM: Int): Boolean {
        try{

            return true
        }catch (e:Exception){
            throw e
        }
    }
}