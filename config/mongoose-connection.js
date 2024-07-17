const mongoose = require("mongoose");
const config = require("config");

const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/bagshop`)
  .then(() => {
    // console.log("Database has been connected");
    dbgr("Database has been connected");
  })
  .catch((err) => {
    // console.log(`Database has not been connected because of ${err}`);
    dbgr(`Database has not been connected because of ${err}`);
  });

module.exports = mongoose.connection;
