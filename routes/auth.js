const { Router } = require('express')
const User = require('../models/User')
const router = Router()


router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'login',
        isLogit: true
    })
})
router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.render('auth/login')
    })
})


router.post('/login', async (req, res) => {
    const user = await User.findById('618ff1e4fadec0b327ee98a4')
    req.user = user
    req.session.isAuthenticated = true
    req.session.save(err => {
        if (err) {
            throw err
        } else {
            res.redirect('/')
        }
    })
})

module.exports = router