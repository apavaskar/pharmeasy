docker stop $(docker ps -aq)
docker run -d -p 27017:27017 -v /Users/ashutoshpavaskar/docker/$1/mongo/db:/data/db mongo
docker container stop $1-redis
docker container rm $1-redis
docker run --name $1-redis -d -p 6379:6379 redis
docker container stop $1-postgres
docker container rm $1-postgres
docker container run --name $1-postgres -d -p 5432:5432 -e POSTGRES_PASSWORD=welcome -e DB_NAME=postgres -v /Users/ashutoshpavaskar/docker/$1/postgres:/var/lib/postgresql/data postgres


docker container stop zydus-redis
docker container rm zydus-redis
docker run --name zydus-redis -d -p 6379:6379 redis


#/home/app/jdk-16.0.1/bin/java -Dspring.profiles.active=pharmeasy -jar nu-sfe-0.0.1-SNAPSHOT.jar