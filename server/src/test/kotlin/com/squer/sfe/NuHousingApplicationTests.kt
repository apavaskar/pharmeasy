package com.squer.sfe

import com.squer.platform.services.properties.ConfigProperties
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.test.context.ContextConfiguration


@SpringBootTest
@ContextConfiguration(classes = [(ConfigProperties::class), (ConfigReader::class)])
class NuHousingApplicationTests {

	@Autowired
	private lateinit var configReader: ConfigReader

	@Test
	fun contextLoads() {
		println("=====================================================")
		println("${configReader.properties}")
		println("=====================================================")
	}

}

@Configuration
class ConfigReader(val properties: ConfigProperties) {


}