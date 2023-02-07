const express = require('express')
const app = express()
const path = require('path')

// add template engine
const hbs = require('express-handlebars')

// setup template engine directory and files extensions
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
}))

// setup static public directory
app.use(express.static('public'))

const mysql = require('mysql')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// create database connection
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
})
con.connect(function (err) {
    if (err) throw err
    console.log('Connected to joga_mysql db')
})

// show all articles - index page
app.get("/", (req, res) => {
    let query = 'SELECT * FROM article';
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err
        articles = result
        res.render('index.hbs', {
            articles: articles
        })
    })
});

// show article by this slug
app.get("/article/:slug", (req, res) => {
    let query = `SELECT article.*, author.name AS author_name FROM article JOIN author ON article.author_id = author.id WHERE article.slug="${req.params.slug}"`;
    let article;
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result[0];
        console.log(article);
        res.render("article", {
            article: article,
            author_name: article.author_name
        });
    });
});

app.get("/author/:author_id", (req, res) => {
    let query = `SELECT article.*, author.name AS author_name FROM article join author on article.author_id=author.id where article.author_id = '${req.params.author_id}'`;
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err
        articles = result
        let author_name = result[0].author_name
        res.render("author", {
            articles: articles,
            author_name: author_name
        })
    })
});



app.listen(4000, () => {
    console.log('App is started at http://localhost:4000')
})
