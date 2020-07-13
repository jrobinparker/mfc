const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const Grid = require('gridfs-stream');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('mongoDB connected');
  } catch(err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
