# painapp server backend

### steps to run the server

- `npm install`
- `configure your .env file`
- `npm run dev`

### how folders are structured

- `src` folder contains all the source code

- `src/implementations` folder contains all the implementations of integration with database (using mongoose).

- `src/models` folder contains all the models of the database.

- `src/routes` folder contains all the routes of the server. Inside this folder, there is a folder called `services` which is how is separed the different services of the server. For example, the `src/routes/services/account` contains all the routes related to the account service. The `index` file agregates all the routes of the service.

- `src/useCases` folder contains all the use cases. A use case is a set of actions that are executed when a route is called. Inside useCases we have the `controller` where we catch the request params and call the use case to execute the actions, and after that, we return the response to the client.

- `src/middlewares` folder contains all the middlewares of the server. A middleware is a function that is executed before the controller of a route. For example, the `src/middlewares/useAuth` is a middleware that verifies if the token is valid and if the user is logged in.

- `src/types` folder contains all the typescript types of the server.
