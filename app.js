require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const articleRouter = require('./routes/article')

const app = express();

const DB_URL = {
  development: process.env.MONGODB_URI,
  test: process.env.MONGODB_TEST_URI
}

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

mongoose.connect(DB_URL[process.env.NODE_ENV], { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, ('connection error')))
db.once('open', () => {
  console.log('Database connected')
})

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articleRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
