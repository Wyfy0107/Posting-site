const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const Profile = require("./ProfileSchema");

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const profile = await Profile.find();
    res.json(profile);
  } catch (error) {
    res.json({ message: error });
  }
});

app.post("/", async (req, res) => {
  try {
    const profile = new Profile({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      age: req.body.age,
    });
    const savedProfile = await profile.save();
    res.send(savedProfile);
  } catch (error) {
    res.json({ message: error });
  }
});

mongoose.connect(
  "mongodb+srv://wyfy:Wyfy010798@cluster0.juxbs.mongodb.net/Cluster0?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);

app.listen(PORT);
