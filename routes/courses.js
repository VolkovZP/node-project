const { Router } = require('express')
const router = Router()
const Cours = require('../models/Courses')

router.get('/', async (req, res) => {
    const courses = await Cours.find()
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


router.post('/remove', async (req, res) => {
    try {
        await Cours.deleteOne({ _id: req.body.id })
        res.redirect('/courses')
    } catch (e) {
        console.log(e)
    }
})


router.post('/edit', async (req, res) => {
    await Cours.findOneAndUpdate(req.body.id, req.body)
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