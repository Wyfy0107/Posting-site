const mongoose = require("mongoose");
const ProfileSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,
});

module.exports = mongoose.model("Profile", ProfileSchema);
