const { Router } = require('express')
const router = Router()
const Cours = require('../models/courses')

router.get('/', async (req, res) => {
    const courses = await Cours.getAll()
    res.render('courses', {
        title: 'courses',
        isCourses: true,
        courses
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const course = await Cours.findById(req.params.id)

    res.render('course-edit', {
        title: `Edit ${course.title}`,
        course
    })
})


router.post('/edit', async (req, res) => {
    await Cours.update(req.body)
    res.redirect('/courses')
})

router.get('/:id', async (req, res) => {
    const course = await Cours.findById(req.params.id);
    res.render('course', {
        title: `Course ${course.title}`,
        course
    })
})


module.exports = router