const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.port;
const db = require('./config/db');

const session = require('express-session');
const redisClient = require('./config/redis.js');
const { RedisStore } = require('connect-redis');


app.use(express.json());
//used to parse JSON data in the request body. 
// If your server receives a POST or PUT request with a JSON body (e.g., from a frontend),
//  this middleware will automatically parse the body into a JavaScript object,
//  making it easy to access the data inside the request.
app.use(express.urlencoded({ extended: true }));
//session setup with redis store

app.use(
  session({
    // store: new connectRedis({
    //   client: redisClient
    //   //ttl: 86400, // session TTL(time to live ) in seconds (1 day);
    //   }),
    store: new RedisStore({client: redisClient,ttl:86400}),
    secret: process.env.session_secret,
    resave: false, // Don't save the session if unmodified
    saveUninitialized: false, // Don't save uninitialized sessions
    cookie: {
      secure: false, // Set to 'true' if using https, otherwise 'false'
      httpOnly: true, // To prevent client-side JavaScript from accessing the cookie
      maxAge: 1000 * 60 * 60 * 24, // Session expiration time
    },
  })
);

app.use('/api', require('./routes/index.js'));
const errorHandler = require("./middlewares/errorHandler.js");


app.use(errorHandler);

app.listen(port, function (err) {
  if (err) {
    console.log('Error: ', err);
    console.log(`Error in running the serever:${err}`);
  }
  else {
    console.log(`server is running on : ${port}`);
  }
});

module.exports = app;