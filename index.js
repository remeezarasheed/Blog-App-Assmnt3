const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5000;


const ArticleInfo = require("./src/model/BlogDB");
//object initialization
const app = express();
app.use(cors());
app.use(express.static('./build'));
//instead of body parser....to get content from the body(for post method)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Acess-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
  next();
});



app.post("/api/article/:name/upvotes", (req, res) => {
  try {
    console.log("post entered");
    const { name } = req.params;
  const filter = { name: name };
  const update = { $inc: { upvotes: 1 } };
  ArticleInfo.findOneAndUpdate(filter, update, { new: true })
  .then(function (article) {
    res.json(article);
  });
  } catch (error) {
    console.log(error);
  }
  
});

//comments routiung
app.post('/api/article/:name/comments',(req,res)=>{
  
    const { name } = req.params;
    const { username,text } = req.body;
    const filter = { name: name };
    const update ={$push : {comments:{username,text}}}
    ArticleInfo.findOneAndUpdate(filter, update, { new: true })
    .then(function (article) {
      res.json(article);
    });
});

app.get("/api/article/:name", async (req, res) => {
 
  const { name } = req.params;
  try {
    console.log("helooiii");
    const result = await ArticleInfo.findOne({name:name});
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/build/index.html'));
 });

 app.listen(port, () => {
  console.log("Server ready at" + port)
});


