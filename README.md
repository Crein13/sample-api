# q2hr-pre-tech-interview
For Q2HR Pre Technical Interview Only

## Walkthrough

For this project I used ```express``` to build RESTful API and implement CRUD operations.
And for simplicity, I implemented ```MVC Pattern``` to be more concise, hence the project structure,

Exam 1/
├── app.js
├── controllers/
│   └── userController.js
├── models/
│   └── user.js
├── unit tests/
│   ├── controllers/
│   │   └── userController.test.js
│   └── models/
│       └── user.test.js
└── package.json

As an example, I created APIs for Users comprising the CRUD operations.

```app.js```
Contains the API routes for all the operations.

```models```
This handles the data interaction to the database and business logic.
For simplicity, I used the raw query for retrieving and inserting records to database.
Usually, I use ```Sequelize``` ORM when interacting with ```PostgreSQL``` for database.

```controllers```
Receives the requests and send responses that interacts with the ```models``` that performs the actions.

With this structure it is easier to maintain and understand the application as it uses modular design by separating different parts into distinct folders.

```unit tests```
I used ```jest``` for unit testing as it was the most I am familiar with and it is being used by most of the JavaScript developers as a standard test framework and ```supertest``` as it promotes easy usage for ```HTTP``` client for NodeJS.

### Reference for 4xx Status Codes
https://www.websitepulse.com/kb/4xx_http_status_codes