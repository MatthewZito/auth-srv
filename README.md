## Auth Service Boilerplate
An out-of-the-box micro-service for user management + authentication | TypeScript <<< Express + Mongo

## Table of Contents
  - [Installation + Usage](#usage)
    + [Aliasing Paths](#alias)
    + [Endpoints](#endpoints)

### <a name="usage"></a> Installation and Usage
Ensure you have Docker installed; run `docker-compose up --build` in the root directory

#### <a name="alias"></a> Aliasing Paths
If you alias a new path, you **must** add it to the module-alias config in the package.json. If you do not, the transpiled JavaScript code will not be able to resolve the alias!

#### <a name="endpoints"></a> Auth Service Endpoints

Default Port: `5000`
Base Endpoint: `/users`

Register New User: `/users/register`
Login: `/users/login`
Renew Token: `/users/renew`
