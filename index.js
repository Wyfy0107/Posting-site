const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const Post = require("./PostSchema");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.json(allPosts);
  } catch (error) {
    res.json(error);
  }
});

app.post("/", async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
    });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/", async (req, res) => {
  try {
    const deletedPost = await Post.deleteOne({ _id: req.body.id });
    res.json(deletedPost);
  } catch (error) {
    console.log(error);
  }
});

mongoose
  .connect(
    process.env.MONDGODB_URI ||
     ,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
