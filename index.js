const express = require('express');
const app = express();
const path = require('path');
const csrf = require('csurf')
const coursesRouts = require('./routes/courses')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const homeRouts = require('./routes/home')
const addRouts = require('./routes/add')
const cardRouts = require('./routes/card');
const authRouts = require('./routes/auth');
const ordersRouts = require('./routes/orders');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const varMiddlewaer = require('./middleware/variable')
const userMiddlewaer = require('./middleware/user')

const MOGNO_URI = "mongodb+srv://tripatka:ayVXGpTIQewxXpuz@cluster0.udjgn.mongodb.net/shop"
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

const store = new MongoStore({
    collection: 'sessions',
    uri: MOGNO_URI
})


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'somthing',
    resave: false,
    saveUninitialized: false,
    store
}))

app.use(csrf())
app.use(varMiddlewaer)
app.use(userMiddlewaer)

app.use('/courses', coursesRouts)
app.use('/add', addRouts)
app.use('/', homeRouts)
app.use('/card', cardRouts)
app.use('/orders', ordersRouts)
app.use('/auth', authRouts)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        await mongoose.connect(MOGNO_URI
            , { useNewUrlParser: true })
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}


start()
