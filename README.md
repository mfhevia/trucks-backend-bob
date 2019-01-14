# truck-backend-bob
#### Backend for connect with bob trucker emulator of bob.io
#### Generated by: Mario Fernández Hevia
#### Keywords: rest,express,mongoose,socket.io

## This backend uses:

* Express
* Mongoose
* Socket.io
* Mocha for testing
* Nodemon for reloading the server when code changes
* Eslint with airbnb configuration for code linting

## Get things running

* Start the server `npm start`
* Start the server on dev mode `npm run start-dev`
* Run unit tests `npm run test-unit`
* Run functional tests `npm run test-functional`
* Run all tests (unit + functional) `npm test`


## Routes
How I don`t have enough time to generate a good api documentation in an standard as OpenApi I write the routes that are available:
* GET /trucks => get all the connected trucks
* POST /status-event => sends a status event to al drivers
* POST /closest-truck => get the closest truck (This is not working yet)

## Notes
* Testing using the 'mongo' docker image (https://hub.docker.com/_/mongo) and node version 10.12.0
* The backend uses "getConfig" package. This could be an anti pattern because the app configuration should be configured by environment variables (https://12factor.net/es/config), but for this quickly challenge is very useful.
* Exists another branch called: "feature/clusters", trying to work with 4 clusters in node, but I don`t have enough time to learn how works fine.