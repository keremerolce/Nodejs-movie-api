const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "mongodb://Keremerolce:k05356998658@ds149353.mlab.com:49353/heroku_jncw7hxx",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      reconnectTries: Number.MAX_VALUE,
      autoReconnect: true
    }
  );
  mongoose.connection.on("open", () => {
    console.log("MongoDB: Connected");
  });
  mongoose.connection.on("error", err => {
    console.log("MongoDB: Error", err);
  });
  mongoose.Promise=global.Promise
};
