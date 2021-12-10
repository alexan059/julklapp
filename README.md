# Julklapp

## TODOS

### UI

- [ ] Add prompt to close group action
- [ ] Add notification popups
- [ ] Redesign group tab

### Frontend

- [ ] Add page transition animations
- [ ] Modularize gsap animations
- [ ] Replace snow image with emojis

### Database

- [ ] Automate database setup
- [ ] Refactor environment variables
- [ ] Create database migrations

## Setup

Make sure to install the dependencies

```bash
yarn install
```

## Development

Start the development server on http://localhost:3000

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment).

## Create secrets

```bash
head -c 60 /dev/random | base64
```

## Dump/Import prostgres schema

```bash
# dump
pg_dump -U postgres secret_friend > dump.sql --schema-only --clean

# import
psql -U postgres -d secret_friend < dump.sql
```

## Execute command in docker container

```bash
docker compose exec -T postgres_container bash -c ''
```

## Copy data from container to host

```bash
docker cp postgres_container:/dump.sql ./dump.sql
```

## Create symlink on server

```bash
ln -s /opt/plesk/node/16/bin/node /usr/bin/node
```