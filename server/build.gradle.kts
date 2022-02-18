import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.4.0"
	id("io.spring.dependency-management") version "1.0.10.RELEASE"
	kotlin("jvm") version "1.4.10"
	kotlin("plugin.spring") version "1.4.10"
}

group = "com.squer"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

repositories {
	mavenCentral()
}

dependencies {
	//runtimeOnly (project (":infinity-web"))
	implementation("org.springframework.boot:spring-boot-starter-quartz")
	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-artemis")
	implementation("org.reflections:reflections:0.9.12")
	implementation("com.github.doyaaaaaken:kotlin-csv-jvm:0.14.0")
	implementation("org.litote.kmongo:kmongo:4.2.2")
	implementation("ch.qos.logback:logback-core:1.2.3")
	implementation("ch.qos.logback:logback-classic:1.2.3")
	implementation("org.slf4j:slf4j-api:1.7.26")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("org.mybatis.spring.boot:mybatis-spring-boot-starter:2.1.4")
	implementation("com.fasterxml.jackson.module", "jackson-module-kotlin", "2.11.0")
	implementation("com.mchange:c3p0:0.9.5.2")
	implementation("br.com.devsrsouza:redissed:1.1.0")
	implementation("commons-codec:commons-codec:1.9")
	// https://mvnrepository.com/artifact/redis.clients/jedis
	implementation("redis.clients:jedis:3.3.0")
	implementation("javax.mail","mail", "1.4.1")
	runtimeOnly("org.postgresql:postgresql")
	implementation("com.github.doyaaaaaken:kotlin-csv-jvm:0.15.0")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.security:spring-security-test")
	implementation("org.apache.velocity", "velocity", "1.7")
	implementation ("net.sf.jasperreports", "jasperreports",  "6.1.0")
	implementation ("com.lowagie","itext", "2.1.7")
	implementation ("org.olap4j","olap4j", "1.2.0")
	// https://mvnrepository.com/artifact/io.springfox/springfox-boot-starter
	implementation ("io.springfox", "springfox-boot-starter", "3.0.0")
	implementation ("io.springfox", "springfox-swagger-ui", "3.0.0")


}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "11"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.bootRun {
	jvmArgs= mutableListOf("-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=32323")
	main = "com.squer.sfe.NuSfeApplication"
}


task<JavaExec>("mapper")  {
	classpath = sourceSets.main.get().runtimeClasspath + sourceSets.main.get().compileClasspath
	main = "com.squer.platform.tools.ToolsController"
	args = listOf("com.squer.sfe.leave.entity.LeaveBalance","app","/Users/shriramgosavi/codebase/nuSfe/nu-sfe/src")
}
