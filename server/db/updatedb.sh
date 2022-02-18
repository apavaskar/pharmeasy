java -jar liquibase.jar \
      --driver= \
      --classpath=postgresql-42.2.11.jar \
      --changeLogFile=version2.0/changelog.sql \
      --url="jdbc:postgresql://localhost:5432/nu_sfe?currentSchema=public" \
      --username=postgres \
      --password=welcome \
      update


java -jar liquibase.jar \
      --driver= \
      --classpath=postgresql-42.2.11.jar \
      --changeLogFile=version2.0/config.sql \
      --url="jdbc:postgresql://localhost:5432/nu_sfe_config" \
      --username=postgres \
      --password=welcome \
      generateChangeLog