# SAMPLE REST API Server

A sample app to simulate CRUD operations on an account entity, using MongoDB / Mongoose.

## Aims & Implementation

- Problem:
  - Persistence store cannot reliably confirm success / failure of CRUD operations synchronously with the request
- Aim:

  - Create a mechanism to permit the API client to perform an operation
    (e.g. create a new account, update an account record, delete an account record), to
    receive confirmation that the request was accepted, and to then later determine whether
    that operation is still processing, succeeded or failed.

- Implementation:
  - Standard 'accounts' endpoints to perform CRUD operations on an `Account` entity (MongoDB model)
  - Additional 'requests' endpoints to record new ('pending') items when successfully calling the endpoint, then update ('successful' / 'failed') based on the outcome of `CREATE` or `DELETE` operations
  - Unique ID created for each request, allowing these to be queried by future accounts endpoints if necessary

## API

- **Accounts**
  - Various endpoints to query account records, plus create and delete account(s)
- **Requests**
  - Query request records in bulk or by individual ID, allowing client to view status

## How To Run Locally

### Database Setup

- Start by downloading & installing MongoDB Community Edition - instructions [here](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/) (using Homebrew is recommended)

  - This will also install CLI tools (including `mongosh` and `mongod`)

- Set up new local database in your chosen location with the following command:

  - `mongod --dbpath <path>`
  - I am using `~/data/db`

- Run `mongosh` to start shell session if you want to run any test queries

### Server Setup

- Run `git clone https://github.com/omcmanus1/sample-backend.git` to pull project code to desired location.
- Run `npm i` to install dependencies.
- Add a `.env` file in the project root - add variables for DB (`DB_PORT`) and server (`ADMIN_PORT`)
  - MongoDB default DB port is `27017`
- Launch server locally:

  ```
  npm run dev
  ```

### Endpoint Usage

- Test endpoints with an API client such as [Postman](https://www.postman.com/product/api-client/)
- Call endpoints with the following URL format:

  - `http://localhost:<ADMIN_PORT>/api/<endpoint>`

- Example request body JSON format for creating a new account:

  ```
  {
    "username": "o-mac",
    "password": "12345",
    "firstName": "Ollie",
    "lastName": "Mc",
    "email": "omc@test.com"
  }
  ```
