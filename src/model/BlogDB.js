const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://remeeza123:Remeeza123@cluster0.jfhgc.mongodb.net/blog-app?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var articleSchema = new Schema({
    name : String,
    username :String,
    upvotes : Number,
    comments:Array
});

var ArticleInfo = mongoose.model('articles',articleSchema);


module.exports = ArticleInfo;