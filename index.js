const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const URI_STRING =
  process.env.MONDGODB_URI || "mongodb://localhost/HelloMongoose";
const Profile = require("./ProfileSchema");

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const profile = await Profile.find();
  res.json(profile);
  res.end();
});

mongoose.connect(
  URI_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  }
);

app.listen(PORT);
