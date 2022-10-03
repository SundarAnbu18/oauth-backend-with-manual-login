const router = require('express').Router();
const passport = require('passport')
const db = require('../model/name')
const CLIENT_URL = "http://localhost:3000/"

router.get('/login/success', async (req, res) => {
    try{
        if (req.user) {
            if(req.user.emails[0].value == (await db.findOne({
                email:req.user.emails[0].value
            })).email)
            console.log('entered email',req.user.emails[0].value)
            console.log('db email', (await db.findOne({
                email:req.user.emails[0].value
            })).email)
            res.status(200).json({
                success: true,
                message: 'successfull',
                user: req.user,
                cookies: req.cookies
    
    
            })
        }
    }catch(err){
        console.log(err)
    }


    
})

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    })
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL)
})

router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed'
}))

router.get('/github', passport.authenticate('github', { scope: ['profile','email'] }))

router.get('/github/callback', passport.authenticate('github', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed'
}))


module.exports = router

