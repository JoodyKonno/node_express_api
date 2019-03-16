const Mongoose = require('mongoose');

const host = process.env.DB_HOST;
const db = process.env.DB_NAME;
const port = '27017';

const stringConnection = `mongodb://${host}:${port}/${db}`;

Mongoose.connect(stringConnection, {
  useNewUrlParser: true,
});

module.exports = Mongoose;
