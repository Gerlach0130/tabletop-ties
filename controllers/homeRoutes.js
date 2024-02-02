// required packages and files
const router = require('express').Router();
const withAuth = require('../utils/auth');
const {User, Game, Event} = require('../models');
// get request for landing page
// INCOMPLETE 
router.get('/', async (req, res) => {
    try{
        // const INSERT MODEL VARIABLE = await MODELNAME. METHOD ({
            // include : [{MODEL: MODEL NAME}]
        // })
        // INCOMPLETE
        const eventData = await Event.findAll({
            include: [{ model: User, attributes: ['name'] },
            { model: Game, attributes: ['title'], include: [{ model: User, attributes: ['name'] }]}
        ]
        });
        const events = eventData.map((event) => event.get({ plain: true }));
        const gameData = await Game.findAll({
            include: [{ model: Game, attributes: ['title'] }]
        });
        const games = gameData.map((game) => game.get({ plain: true }));
        res.render('homepage', {
            // add in
            events,
            games,
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
        include: [{ model: User, attributes: ['name'] }],
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
    res.render('login', {loggedIn: req.session.logged_in});
});

// Signup Route
router.get('/signup', (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/profile');
            return;
        };
        res.render('signup', { loggedIn: req.session.logged_in });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;