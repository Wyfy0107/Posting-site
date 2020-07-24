const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const Profile = require("./ProfileSchema");

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send(process.env.MONDGODB_URI);
});

mongoose.connect(
  process.env.MONDGODB_URI ||
    "mongodb+srv://wyfy:Wyfy010798@cluster0.juxbs.mongodb.net/Cluster0?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      console.log("failed to" + error);
    } else {
      console.log("success");
    }
  }
);

app.listen(PORT);
