const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.port;
const db = require('./config/db');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', require('./routes/index.js'));
app.listen(port, function (err) {
    if (err)
    {
        console.log('Error: ', err);
        console.log(`Error in running the serever:${err}`);
    }
    else {
        console.log(`server is running on : ${port}`);
    }
})