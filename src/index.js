const express = require('express');
const unless = require('express-unless');
const cors = require('cors');
require('express-async-errors');

const authMiddleware = require('./middlewares/auth');
const publicRoutes = require('./middlewares/auth/publicRoutes');
const errorHandler = require('./middlewares/errorHandler');

authMiddleware.unless = unless;

const routes = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(authMiddleware.unless(publicRoutes));
app.use(routes);
app.use(errorHandler);

app.listen(3001, () => { console.log('🔥 Server Started at http://localhost:3001'); });
