# painapp server backend

This public repository is the canonical Welfare Footprint Institute source for the current-generation Pain Track backend.

## Current status

Pain Track is intentionally paused. The retained Cloud Run services remain hibernated/private, and the three former Cloud Build triggers are disabled. A merge to `main` does not automatically deploy this repository.

The `main` branch requires a pull request and one approving review. This protects changes but does not resolve the known dependency, authorization, credential, recovery, or integration work required before any future reactivation.

No public backend, new deployment, database migration, or credential change was created as part of the ownership transfer.

Canonical public system documentation: [`welfare-footprint-institute/pain-track-docs`](https://github.com/welfare-footprint-institute/pain-track-docs)

## Local development

- `npm install`
- configure a local, non-production `.env` file
- `npm run dev`

Do not use production credentials or reactivate provider integrations merely to run the source locally.

## Folder structure

- `src` folder contains all the source code

- `src/implementations` folder contains all the implementations of integration with database (using mongoose).

- `src/models` folder contains all the models of the database.

- `src/routes` folder contains all the routes of the server. Inside this folder, there is a folder called `services` which is how is separed the different services of the server. For example, the `src/routes/services/account` contains all the routes related to the account service. The `index` file agregates all the routes of the service.

- `src/useCases` folder contains all the use cases. A use case is a set of actions that are executed when a route is called. Inside useCases we have the `controller` where we catch the request params and call the use case to execute the actions, and after that, we return the response to the client.

- `src/middlewares` folder contains all the middlewares of the server. A middleware is a function that is executed before the controller of a route. For example, the `src/middlewares/useAuth` is a middleware that verifies if the token is valid and if the user is logged in.

- `src/types` folder contains all the typescript types of the server.

## Change boundary

Any reactivation requires a separately reviewed plan covering dependency/security remediation, an institutional backup and restoration check, secrets and database users, OAuth, reCAPTCHA, transactional email, OpenAI, deployment controls, and end-to-end tests.
