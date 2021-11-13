const { Router } = require('express')
const Cours = require('../models/Courses')
const router = Router()

router.post('/add', async (req, res) => {
    const course = await Cours.findById(req.body.id)
    await req.user.addToCart(course)
    res.redirect('/card')
})

router.delete('/remove/:id', async (req, res) => {
    const card = await Card.remove(req.params.id)
    res.status(200).json(card)
})

router.get('/', async (req, res) => {
    const card = await Card.fetch()
    res.render('card', {
        isCard: true,
        title: 'basket',
        courses: card.courses,
        price: card.price
    })
})

module.exports = router

