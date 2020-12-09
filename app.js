require('dotenv').config()
require('./database/client')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const placeRouter = require('./routes/place');
const reviewRouter = require('./routes/review');
const mapRouter = require('./routes/map');

const app = express();
app.disable('etag');

app.use(cors())
app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/map', mapRouter);
app.use('/user', userRouter);
app.use('/place', placeRouter);
app.use('/review', reviewRouter);

module.exports = app;
