const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');



const ArticleInfo = require("./src/model/BlogDB");
//object initialization
const app = express();
app.use(cors());
app.use(express.static('./build/'));
//instead of body parser....to get content from the body(for post method)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


 

app.get("/api/article/:id", async (req, res) => {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods:GET , POST ,PUT , DELETE",);
  const { id } = req.params;
  try {
    const result = await ArticleInfo.findOne({name:id});
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post("/api/article/:name/upvotes", (req, res) => {
  const { name } = req.params;
  const filter = { name: name };
  const update = { $inc: { upvotes: 1 } };
  ArticleInfo.findOneAndUpdate(filter, update, { new: true })
  .then(function (article) {
    res.json(article);
  });
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

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/build/index.html'));
 });

app.listen(5000, () => console.log("listening to port 5000"));


