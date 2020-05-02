const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

var cors = require('cors');
var helmet = require('helmet');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const configDB = require('./config/database.js');

var server = app.listen(3000);
app.io = require('socket.io')(server);
var routes = require('./routes/events')(app.io);

// configuration ===============================================================

const connectDB = async () => {
  await mongoose.connect(
    configDB.url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) console.log('error :', error);
      else console.log('Connect successfully');
    }
  );
  mongoose.set('useCreateIndex', true);
};

connectDB().catch((error) => console.error(error));

// config log + security ======================================================================
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: '*', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
    allowedHeaders: false,
  })
);

app.use(helmet());

app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);

// routes ======================================================================

app.use('/events', routes);

// launch ======================================================================

// app.listen(port);
console.log('The magic happens on port ' + port);
