const express = require('express');
const app = express();
const exphbs = require('express-handlebars')
const coursesRouts = require('./routes/courses')
const homeRouts = require('./routes/home')
const addRouts = require('./routes/add')
const cardRouts = require('./routes/card')
/*setting handlebars*/
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('vews', 'views')
/** */
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.use('/courses', coursesRouts)
app.use('/add', addRouts)
app.use('/', homeRouts)
app.use('/card', cardRouts)



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})