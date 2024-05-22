// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://mohammedsharbas32:CrWxCXzhGI4LPpMD@task-fantasy-cricket-ap.pm3nkyj.mongodb.net/?retryWrites=true&w=majority&appName=task-fantasy-cricket-app');
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
