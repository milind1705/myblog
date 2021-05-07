const express = require("express");
const mongoose = require('mongoose');
const Article = require('./models/article')
const methodOverride = require('method-override')
const articleRouter = require('./routes/articles')
const app = express();

mongoose.connect("mongodb://localhost:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true
})
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use('/articles', articleRouter)

app.get('/', async (req, res) => {
    const articles = await Article.find()
    res.render("articles/index", {articles: articles})
})

app.listen(3000, (req, res) => {
    console.log("server is running at 3000")
})