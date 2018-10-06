const createError = require('http-errors'),
      express = require('express'),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      logger = require('morgan'),
      expressHbs = require('express-handlebars'),
      mongoose = require('mongoose'),
      session = require('express-session'),
      passport = require('passport'),
      flash = require('connect-flash'),
      validator = require('express-validator'),
      MongoStore = require('connect-mongo')(session),
      seedDB = require("seed/product-seeder");


var indexRouter = require('./routes/index');
var userRoutes = require('./routes/user');


var app = express();

// Mongoose ORM
// Local Mongoose Connect:
// mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true});


// Environment Variable  + Local Mongoose Connect
var url = process.env.DATABASEURL || "mongodb://localhost:27017/shopping"
mongoose.connect(url, { useNewUrlParser: true});

require('./config/passport');



// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'There is no truth', 
  resave: false, 
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: { maxAge: 180 * 60 * 1000 }
}));
// maxAge = maximum time of client/user session cookie before new session begins
// 1 minute = 60 * 1000 milliseconds
// 180 * 60 * 1000ms = 3hrs = 180 minutes
//For testing, you may want to reduce session, from 180 to 2 or 3
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
seedDB();  // seed the database

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/user', userRoutes);
app.use('/', indexRouter);

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
