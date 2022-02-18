package com.squer.platform.security.service

import com.squer.platform.persistence.SearchCriteria
import com.squer.platform.persistence.dao.DbContextHolder
import com.squer.platform.persistence.repository.SquerRepository
import com.squer.platform.security.SecurityQueryName
import com.squer.platform.security.entity.LoginInfo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class LoginInfoService {

    @Autowired
    lateinit var repository: SquerRepository

    fun logInfo(loginInfo: LoginInfo) {
        var criteria = SearchCriteria(SecurityQueryName.LOGIN_INFO_SELECT.query)
        criteria.addCondition("user_id", loginInfo.userId.id)
        val infos  = repository.find(criteria).filterIsInstance<LoginInfo>()
        if (infos == null || infos.isEmpty()){
            loginInfo.firstLoginTime = Date()
            loginInfo.lastAccessTime = Date()
            repository.create(loginInfo)
        } else {
            var info = infos.first()
            info.lastAccessTime = Date()
            info.actionTaken = loginInfo.actionTaken
            repository.update(info)
        }
    }
}