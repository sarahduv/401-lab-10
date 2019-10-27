'use strict';

/**
 * API Server Module
 * @module src/app
 */

const cwd = process.cwd();

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require( `${cwd}/src/middleware/500.js`);
const notFound = require( `${cwd}/src/middleware/404.js` );
const v1Router = require( `${cwd}/src/api/v1.js` );
const swagger = require(`${cwd}/src/api/swagger.js`);
const TodoModel = require('./models/todo/todo-model.js')
const todoModel = new TodoModel();

const { buildSchema } = require('graphql');
const expressGraphql = require('express-graphql');

// Prepare the express app
const app = express();


const simpleSchema = buildSchema(`
  type Query {
    todo(id: Int!): Todo
    todos(text: String, category: String, assignee: String, difficulty: Int, complete: Boolean): [Todo]
  }
  type Todo {
    id: Int
    text: String
    category: String
    assignee: String
    difficulty: Int
    complete: Boolean
  }
  type Mutation {
    post(id: Int, text: String, category: String, assignee: String, difficulty: Int, complete: Boolean): Todo
  }
`);

const simpleResolver = {
  todo: getTodo,
  todos: getTodos,
  post: addTodo,
}

/**
 * Creates a single todo
 * @param args {Object} - creates a object with the user args
 * @returns todo {Object} - returns the created todo object
 */
async function addTodo(args) {
  // .create() inserts the new todo object
  return await todoModel.post(args);
}

/**
 * Fetches a single todo
 * @param args {Number} - takes in an ID
 * @returns {Object} - returns the object that matches the queried ID
 */
async function getTodo(args) {
  // will return the object that matches id
  const result = await todoModel.get(args);
  return result.length === 0 ? result : result[0];
}

/**
 * Fetches multiple todos by the filters
 * @param args {Number} - takes in an ID
 * @returns {Object} - returns the object that matches the queried ID
 */
async function getTodos(args) {
  // will return the object that matches id
  return await todoModel.get(args);
}

const graph = expressGraphql({
  schema: simpleSchema,
  rootValue: simpleResolver,
  graphiql: true
});

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Static Routes
app.use('/docs', express.static('docs'));

// Routes
app.use(v1Router);
app.use('/graphql', graph);

// Catchalls
app.use(notFound);
app.use(errorHandler);

/**
 * Start Server on specified port
 * @param port {integer} (defaults to process.env.PORT)
 */
let start = (port = process.env.PORT) => {
  app.listen(port, () => {
    console.log(`Server Up on ${port}`);
  });
};

module.exports = {app,start};
