// import database connection
const con = require('../utils/db.js')

// show all articles - index page
const getAllArticles = (req, res) => {
    let query = 'SELECT * FROM article';
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err
        articles = result
        res.render('index.hbs', {
            articles: articles
        })
    })
};

// show article by this slug
const getArticleBySlug = (req, res) => {
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
};

// export controller functions
module.exports = {
    getAllArticles,
    getArticleBySlug
}