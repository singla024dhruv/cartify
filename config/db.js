const mongoose = require('mongoose');
require('dotenv').config;
const database = process.env.db;
mongoose.connect(`mongodb://127.0.0.1/${database}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "error connecting to the mongodb"));
db.once('open', function () {
    console.log('Connected to database:: MongoDB');

});
module.exports = db;