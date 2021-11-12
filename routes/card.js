const { Router } = require('express')
const Cours = require('../models/Courses')

const router = Router()

router.post('/add', async (req, res) => {
    const course = await Cours.findById(req.body.id)
    await Card.add(course)
    res.redirect('/card')
})

router.get('/', async (req, res) => {
    const card = await Card.fetch()
    res.render('card', {
        title: 'basket',
        card
    })
})

module.exports = router