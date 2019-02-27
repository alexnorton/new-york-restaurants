# New York Restaurants

A web app for browsing New York restaurants and their hygiene ratings based on [this data dump](https://s3.amazonaws.com/orcd-hw/thai_data_dump_7-18-18.sql).

Try it out [here](https://new-york-restaurants.h.alexnorton.com).

## Overview

### Frontend

Written in JavaScript using [React](https://reactjs.org/), [Create React App](https://facebook.github.io/create-react-app/), [React Router](https://reacttraining.com/react-router/) and [Bootstrap](https://getbootstrap.com/).

I took this as an opportunity to try out the new [React Hooks API](https://reactjs.org/docs/hooks-overview.html). Fetching data from the API is implemented as a custom hook, resulting in the logic in presentation component being very simple.

### API

Written in Python using [Flask](http://flask.pocoo.org/), [SQLAlchemy](https://www.sqlalchemy.org/) and [Marshmallow](https://marshmallow.readthedocs.io/).

This was the first time I'd used a relational database or an ORM in quite a while, and my first time ever using SQLAlchemy and Marshmallow. It took some time to reacquaint myself with the patterns for defining and querying models.

## Running

There are separate [Docker Compose](https://docs.docker.com/compose/) setups for development and production.

### Development mode

In development mode just the database is run in a Docker container, while the frontend and API are run locally.

Given a local install of Python 3 with [Pipenv](https://pipenv.readthedocs.io/en/latest/) and Node.js 8 with [Yarn](https://yarnpkg.com/lang/en/), first install the dependencies for the client:

```sh
cd client
yarn
cd ..
```

And the API:

```sh
cd server
pipenv install
cd ..
```

Then start the database, API and client:

```sh
make dev-start
```

Then, in a separate terminal, create the database:

```sh
docker exec -i $(docker-compose -f docker/docker-compose.dev.yml ps -q db) mysql -uroot -pmy-secret-pw -e "CREATE DATABASE `restaurants`;"
```

Import data dump:

```sh
docker exec -i $(docker-compose -f docker/docker-compose.dev.yml ps -q db) mysql -uroot -pmy-secret-pw restaurants < ~/thai_data_dump_7-18-18.sql
```

Create indexes:

```sh
docker exec -i $(docker-compose -f docker/docker-compose.dev.yml ps -q db) mysql -uroot -pmy-secret-pw restaurants < db/01_create_indexes.sql
```

The app should be accessible on [http://localhost:3000/](http://localhost:3000/).

### Production mode

In production mode the database, API and frontend are each run in a separate Docker container.

Build the images:

```sh
make prod-build
```

Start the service containers:

```sh
make prod-start
```

Create the database (if not using data previously created in development mode):

```sh
docker exec -i $(docker-compose -f docker/docker-compose.prod.yml ps -q db) mysql -uroot -pmy-secret-pw -e "CREATE DATABASE `restaurants`;"
```

Import data dump:

```sh
docker exec -i $(docker-compose -f docker/docker-compose.prod.yml ps -q db) mysql -uroot -pmy-secret-pw restaurants < ~/thai_data_dump_7-18-18.sql
```

Create indexes:

```sh
docker exec -i $(docker-compose -f docker/docker-compose.prod.yml ps -q db) mysql -uroot -pmy-secret-pw restaurants < db/01_create_indexes.sql
```

Logs can be viewed by running:

```sh
make prod-logs
```

The app should be accessible on [http://localhost:8080/](http://localhost:8080/).
