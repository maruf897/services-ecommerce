var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    createIndexes: { unique: true },
  },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  number: { type: String, required: true },
  usertype:{type: String, default: "customer"}
});
const User = mongoose.model("User", userSchema);
module.exports = User;
