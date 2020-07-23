const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const uristring =
  process.env.MONDGODB_URI || "mongodb://localhost/HelloMongoose";
const Profile = require("./ProfileSchema");

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const profile = await Profile.find();
  res.json(profile);
  res.end();
});

mongoose.connect(uristring, (err, res) => {
  if (err) {
    console.log("failed" + error);
  } else {
    console.log("success");
  }
});

app.listen(PORT);
