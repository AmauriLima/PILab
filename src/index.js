/* eslint-disable no-console */
const express = require('express');
const unless = require('express-unless');
require('express-async-errors');

const authMiddleware = require('./middlewares/auth');

authMiddleware.unless = unless;

const routes = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(authMiddleware.unless({
  path: [
    { url: '/auth/signup', methods: 'POST' },
    { url: '/auth/login', methods: 'POST' },
  ],
}));

app.use(routes);
app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

app.listen(3000, () => { console.log('🔥 Server Started at http://localhost:3000'); });
