# Swiftbank

This is a full-stack banking web application using React for the frontend, Node.js for the backend, and PostgreSQL for data management. The project's primary goals are to create a secure and user-friendly platform that allows both customers and administrators to perform essential banking tasks seamlessly.

## Pre-requisite

1. Node.js : [download node.js](https://nodejs.org/en/download/package-manager)

2. PostgreSQL : [download Postgres](https://www.postgresql.org/download/)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV=development`

`SERVER_PORT=8000`

DATABASE CONNECTION

`DATABASE_USER = YOUR_DATABASE_USER_NAME`

`DATABASE_PASSWORD = YOUR_DATABASE_USER_NAME`

`DATABASE_PORT = YOUR_DATABASE_PORT` // 5432 is default port

`DATABASE_HOST = 127.0.0.1`

`DATABASE = Swiftbank`

SESSION

`SESSION_SECRET=TYPE_THE_SECRET_KEY_YOU_WANT`

## Run Locally

Clone the project

```bash
  git clone https://github.com/codebyvik/Swiftbank
```

Go to the project directory

```bash
  cd Swiftbank
```

### starting server (back-end)

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

**Database and table creation **

Create Database

```bash
  npx sequelize-cli db:create
```

Create Tables

```bash
  npx sequelize-cli db:migrate
```

Start the server

```bash
  npm start
```

### starting client(front-end)

Go to the client directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
