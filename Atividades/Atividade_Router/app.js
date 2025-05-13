var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/users');
var aboutRouter = require('./routes/about');
var newsRouter = require('./routes/news');
var signinRouter = require('./routes/users/signin');
var useridRouter = require('./routes/users/signin_userid');
var dataRouter = require('./routes/data');
var signupRouter = require('./routes/users/signup');

var app = express();

// view engine setup
router.set('views', path.join(__dirname, 'views'));
router.set('view engine', 'ejs');

router.use(logger('dev'));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));

router.use('/', indexRouter);
router.use('/users', usersRouter);
router.use('/users/signin', signinRouter);
router.use('/users/signup', signupRouter);
router.use('/about', aboutRouter);
router.use('/data', dataRouter);
router.use('/news', newsRouter);
router.use('/users/signin_userid', useridRouter);

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  next(createError(404));
});

// error handler
router.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = router;
