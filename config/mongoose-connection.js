const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://localhost:27017/bagshop`)
  .then(() => {
    console.log("Database has been connected");
  })
  .catch((err) => {
    console.log(`Database has not been connected because of ${err}`);
  });

module.exports = mongoose.connection;
