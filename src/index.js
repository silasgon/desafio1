const { request, response } = require("express");
const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');
const res = require('express/lib/response');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

/**
 { 
  id: 'uuid', // precisa ser um uuid
  name: 'Danilo Vieira', 
  username: 'danilo', 
  todos: []
}
 */

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return response.status(400).json({ error: "User not found!" });
  }
  
  request.user = user;

  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const userAlreadyExists = users.some(
    (user) => users.username === username
  );

  if (userAlreadyExists) {
    return response.status(400).json({ error: "User already exists!" })
  }

  users.push({
    name,
    username,
    id: uuidv4(),
    todos: []
  })

  return response.status(200).send();
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;

  const { username } = request;

  const todo = {
    id: uuidv4,
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  users.todos.push(todo);

  return response.status(201).send();
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;