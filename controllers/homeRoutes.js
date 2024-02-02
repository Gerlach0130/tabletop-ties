// required packages and files
const router = require('express').Router();
const withAuth = require('../utils/auth');
const {User} = require('../models');
// get request for landing page
// INCOMPLETE 
router.get('/', async (req, res) => {
    try{
        // const INSERT MODEL VARIABLE = await MODELNAME. METHOD ({
            // include : [{MODEL: MODEL NAME}]
        // })
        // INCOMPLETE
        res.render('REPLACE', {
            // add in
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// profile route withAuth middleware to ensure user is logged in
// LINE 28 REPLACE WITH MODEL NAME
router.get('/profile', withAuth, async (req, res) => {
    try{ 
        const userData = await User.findbyPk(req.session.user_id, {
        attributes: {exclude: ['password']},
        include: [{model: REPLACE}],
        });
        const user = userData.get({plain: true});
        res.render('profile', {
            ...user, 
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// login route
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
});

module.exports = router;