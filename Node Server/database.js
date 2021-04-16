const mongoose = require('mongoose');
require('dotenv/config');

const database = mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  () => {
    console.log('Database connected!');
  },
  err => {
    console.log(err);
  },
);

module.exports = database;
