// application packages
const express = require('express')
const app = express()
const path = require('path')
const con = require('./utils/db.js')

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

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const articleRoutes = require('./routes/article')

const authorRoutes = require('./routes/author')

// to use article routes
app.use('/', articleRoutes)
app.use('/article', articleRoutes)

// to use author routes
app.use('/author', authorRoutes)

app.listen(4000, () => {
    console.log('App is started at http://localhost:4000')
})