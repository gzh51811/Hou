var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var listRouter = require('./routes/rlist');
var changeRouter = require('./routes/rchange');
var addAdminRouter = require('./routes/addAdmin');
var adminListRouter = require('./routes/adminList');
var uploadsRouter = require('./routes/uploads');
var addItemRouter = require('./routes/addItem');
var fenleiRouter = require('./routes/fenlei');
var tokenRouter = require('./routes/token');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/list', listRouter);
app.use('/change', changeRouter);
app.use('/addAdmin', addAdminRouter);
app.use('/adminList', adminListRouter);
app.use('/uploads', uploadsRouter);
app.use('/addItem', addItemRouter);
app.use('/fenlei', fenleiRouter);
app.use('/token', tokenRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
