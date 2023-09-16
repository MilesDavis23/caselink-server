require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lawyerRoutes = require('./test_data/lawyer');
var loginRoutes = require('./routes/loginCheck')
const registrationRoutes = require('./routes/registration');
var resetPasswordRoutes = require('./routes/resetPassword');
const makeACaseRoute = require('./routes/make-a-case');
const browseCasesRoute = require('./routes/browse-cases');
const personMyCases = require('./routes/person/my-cases')
const caseRoute = require('./routes/common/individualCasePage');
const putIntoMyCases = require('./routes/lawyer/putinto-my-cases');
const lawyerMyCases = require('./routes/lawyer/lawyer-mycases');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'http://localhost:3000', // specify the origin that's allowed
  credentials: true // allow credentials (cookies) to be included in the request
}));

app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/lawyer', lawyerRoutes);
app.use('/login', loginRoutes)
app.use('/registration', registrationRoutes);
app.use('/api/reset-password', resetPasswordRoutes);
app.use('/make-a-case', makeACaseRoute);
app.use('/browse-cases', browseCasesRoute);
app.use('/person/my-cases', personMyCases);
app.use('/case-page/', caseRoute);
app.use('/putinto-mycases', putIntoMyCases);
app.use('/lawyer/my-cases', lawyerMyCases);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.listen(3001, () => {
  console.log('Server running on port 3001');
})

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
