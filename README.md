# New York Restaurants

## Run in production

Create the database:

```sh
docker exec -i $(docker-compose -f docker/docker-compose.prod.yml ps -q db) mysql -uroot -pmy-secret-pw "CREATE DATABASE `restaurants`;"
```

Import data dump:

```sh
docker exec -i $(docker-compose -f docker/docker-compose.prod.yml ps -q db) mysql -uroot -pmy-secret-pw restaurants < ~/thai_data_dump_7-18-18.sql
```

Create indexes:

```sh
docker exec -i $(docker-compose -f docker/docker-compose.prod.yml ps -q db) mysql -uroot -pmy-secret-pw restaurants < db/01_create_indexes.sql
```
