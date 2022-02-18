docker stop $(docker ps -aq)
docker container stop $1-postgres
docker container rm $1-postgres
docker container run --name $1-postgres -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e DB_NAME=postgres -v /Users/ashutosh/docker/$1/postgres:/var/lib/postgresql/data postgres:13.5
