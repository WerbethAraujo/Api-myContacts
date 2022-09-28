const express = require('express');
require('express-async-errors');

const errorHandler = require('./app/middleware/errorHandler');
const cors = require('./app/middleware/cors');

const app = express();

const routes = require('./routes');

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(3001, () => {
  console.log('Server running at http://localhost:3001/');
});
