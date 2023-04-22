Application Title: Node.js Backend Template
===========================================

This application is a Node.js backend template designed to provide a well-organized structure for developing RESTful APIs. It features a modular architecture with controllers, services, models, and middlewares. The app is set up to handle user authentication, and it includes a comprehensive set of utility functions for handling common tasks such as encryption, validation, and rendering responses.

Features
--------

-   Express.js server with a clear structure for controllers, services, models, and middlewares
-   Support for user authentication with encryption, password hashing, and UUID generation
-   Error handling and response rendering
-   Utility functions for common tasks
-   Configurable environment settings

Directory Structure
-------------------

-   `application`: Contains application-level code, such as superclass implementations for controllers and services
-   `config`: Stores configuration settings for different environments (e.g., development, production)
-   `controllers`: Holds the application's controller files, responsible for handling HTTP requests and rendering responses
-   `helpers`: Includes utility functions for various tasks, such as encryption, date manipulation, and validation
-   `middlewares`: Contains middleware functions for handling specific tasks, such as decrypting JWE payloads or printing HTTP responses
-   `models`: Defines data models and related methods for interacting with the application's data store
-   `services`: Holds service classes that handle the business logic of the application

Installation
------------

1.  Clone the repository
2.  Run `npm install` to install dependencies
3.  Set the environment variables as needed (e.g., `NODE_ENV`)
4.  Start the server with `npm start`

Usage
-----

The application includes several endpoints for testing and demonstration purposes. These endpoints can be accessed through the `/mocha` route:

-   `GET /mocha/get/200`: Returns a 200 OK response with a `get` payload
-   `POST /mocha/post/201`: Returns a 201 Created response with a `post` payload
-   `PUT /mocha/put/202`: Returns a 202 Accepted response with a `put` payload
-   `PATCH /mocha/patch/202`: Returns a 202 Accepted response with a `patch` payload
-   `DELETE /mocha/del/204`: Returns a 204 No Content response
-   `GET /mocha/get/401`: Returns a 401 Unauthorized response

Additionally, the app includes user authentication endpoints:

-   `POST /user/signup`: Creates a new user with a username and encrypted password
-   `POST /user/signin`: Authenticates a user with their username and password

License
-------

[MIT License](https://chat.openai.com/c/LICENSE)
