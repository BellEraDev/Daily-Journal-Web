//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Hello Everyone!. It's about path of my career as software engineer from zero to hero!";
const aboutContent = "Hi! My name is Watcharapun (Belle). I'm from Thailand where is one of the best country you should visit once. I'm passionate about coding and technology. I want to become an expert developer. I try to learn as much as possible and this website is a part of my learning.";
const contactContent = "💬 Want to connect?";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://watcharapun:@Bell2540@cluster0.vpymh.mongodb.net/BlogDB", {useNewUrlParser: true, useUnifiedTopology: true})
// mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true})
const postSchema = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", postSchema)


app.get("/", function(req, res){
  Post.find({}, (err, posts) => {
    res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
  })
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save((err) => {
    if(!err) {
      res.redirect("/");
    }
  })

});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;

      Post.findOne({_id: requestedPostId}, (err, post) => {
        res.render("post", {
          title: post.title,
          content: post.content
        });
      })

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
