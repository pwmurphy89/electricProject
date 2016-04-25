
//Step ONE: INit app with the express generator--express electricProject.  This will create entire folder structure
// with everything we need to start making an express web aplliction
//STep TWO: Add gitignore file that will atleast ignore everything inside node_modules
//If someone wants to run your app, they can do an npm install themselves
//STep THREE: Copy the compass boilerplate into the project
//This will give you access to compass.  You need to change path of css write directory to ../public/stylesheets
//Init git the repo
//Step FIVE: npm install ejs --save
//step SIX: npm install mongodb --save
//--These will get two more modules from the npm market to use in app
//STEP SEVEN: npm install
///--this will install exprress, all its dependenece,s etc./ whatever is inside of package.json
//STEP EIGHT: Run nodemon
//STEP NINE: switch templating engine if desire from jade
//--in appp.js, go down to the app.set and change it from jade to ejs
//--in the views folder, cahgne the .jade files to .ejs files
//STEP TEN: in index.ejs, set up common files and include them
// --head
//--nav
//--footer
//STEP ELEVEN: Set up a wrapper div to hold our voting buttons and image
//STEP TWEELVE: Style homepage
//STEP THIRTEEN: Set up and text connection to mongo.


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
