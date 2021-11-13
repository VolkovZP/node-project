const express = require('express');
const app = express();
const path = require('path');
const coursesRouts = require('./routes/courses')
const mongoose = require('mongoose')
const homeRouts = require('./routes/home')
const addRouts = require('./routes/add')
const cardRouts = require('./routes/card');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
/*setting handlebars*/
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('vews', 'views')
/** */
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))


app.use('/courses', coursesRouts)
app.use('/add', addRouts)
app.use('/', homeRouts)
app.use('/card', cardRouts)


const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = "mongodb+srv://tripatka:ayVXGpTIQewxXpuz@cluster0.udjgn.mongodb.net/shop"
        await mongoose.connect(url, { useNewUrlParser: true })
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}
start()