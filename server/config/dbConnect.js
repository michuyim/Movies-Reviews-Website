const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.connect(process.env.DATABASE_URI)
   .then(() => {
    console.log("Connected to MongoDB Server");
   })
  .catch((err) => {
    console.log(`Error Connecting to MongoDB Server: ${err}`)
    process.exit(1);
   })
}
// Optionally, set max listeners if needed
require('events').EventEmitter.defaultMaxListeners = 15;

module.exports = connectDB;