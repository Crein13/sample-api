const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const userController = require('./controllers/userController');

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON data in requests

// User API routes
app.post('/users', userController.createUser);
app.get('/users', userController.getUsers);
app.get('/users/:id', userController.getOneUser);
app.put('/users/:id', userController.updateUser);
app.put('/users/:id', userController.deleteUser);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
