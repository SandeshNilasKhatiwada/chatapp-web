const express = require('express');
const router = require('./routes/index');
const { connect_db } = require('./configs/db.config');
const errorHandler = require('./middlewares/errorHandler');
const path = require('path');

//setting up the dotenv
require('dotenv').config();

const app = express();

// setting up the json for the api
app.use(express.json());

connect_db(process.env.DB_URL);

// setting up all the routers for the user
app.use('/api', router);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//handels all the errors
app.use(errorHandler);

app.listen(process.env.PORT, (err) => {
  err ? console.log(err) : console.log(`Listening to port ${process.env.PORT}`);
});
