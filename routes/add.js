const { Router } = require('express')
const router = Router()
const Course = require('../models/courses')
router.get('/', (req, res) => {
    res.render('add', {
        title: 'add',
        isAdd: true,
    })
})


router.post('/', (req, res) => {
    const { title, price, img, description } = req.body
    const course = new Course(title, price, img, description)
    course.save()

    res.redirect('/courses')
})

module.exports = router