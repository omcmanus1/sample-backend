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
  - Query request records in bulk or by individual ID, and view status
