const mongoose = require("mongoose");

const { MONGO_PASS, NODE_ENV } = process.env;
const mongodbUrl = `mongodb+srv://yg:${MONGO_PASS}@cluster0-gdfpb.mongodb.net?retryWrites=true&w=majority`;

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: NODE_ENV === "production" ? "prod" : "test"
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to DB successfully.");
});
