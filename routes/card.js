const { Router } = require('express')
const Cours = require('../models/Courses')
const Card = require('../models/Card')
const router = Router()

router.post('/add', async (req, res) => {
    const course = await Cours.findById(req.body.id)
    await Card.add(course)
    res.redirect('/card')
})

router.get('/', async (req, res) => {
    const card = await Card.fetch()
    res.render('card', {
        isCard: true,
        title: 'basket',
        courses: card.course,
        price: card.price
    })
})

module.exports = router