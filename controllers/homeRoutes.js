// required packages and files
const router = require('express').Router();
const withAuth = require('../utils/auth');
const {User, Game, Event} = require('../models');

// get request for landing page
router.get('/', async (req, res) => {
     try{
        const eventData = await Event.findAll({});
        const events = eventData.map((event) => event.get({ plain: true }));
        const gameData = await Game.findAll({});
        const games = gameData.map((game) => game.get({ plain: true }));
        const userData = await User.findAll({});
        const users = userData.map((user) => user.get({ plain: true }));
        res.render('homepage', {
          events,
          games,
          users,
          logged_in: req.session.logged_in
       });
    } catch (err) {
        res.status(500).json(err);
    }
});

// profile route withAuth middleware to ensure user is logged in
router.get('/profile', withAuth, async (req, res) => {
    try{ 
        const userData = await User.findbyPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{
                model: Game,
                as: 'interested_games', 
                attributes: ['id', 'title', 'genre'],
                through: {
                    attributes: [], // Exclude join table attributes if not needed
                },
            }],
        });
        if (!userData) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
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

// GET route to fetch specific game
router.get('/games/:id', async (req, res) => {
    console.log('Fetching game with ID:', req.params.id); 
    try {
        const gameData = await Game.findByPk(req.params.id, {
            include: [{
                model: User,
                as: 'interested_users',
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }]
        });

        if (gameData) {
            const games = gameData.get({ plain: true });
            res.render('game', { ...games, logged_in: req.session.logged_in });
        } else {
            res.status(404).send('Game not found');
        }
    } catch (err) {
        res.status(500).json(error);
    }
});

// GET route to render a specific event by ID
router.get('/events/:id', withAuth, async (req, res) => {
    try {
        const eventData = await Event.findByPk(req.params.id, {
            include: [
                {
                    model: Game,
                    as: 'event_games',
                    attributes: ['id', 'title', 'genre'],
                },
                {
                    model: User,
                    as: 'attendees', 
                    attributes: ['id', 'name'],
                    through: {
                        attributes: [],
                    },
                }
            ]
        });

        if (!eventData) {
            res.status(404).send('Event not found');
            return;
        }

        const event = eventData.get({ plain: true });

        res.render('event', {
            event,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        console.error('Error fetching event details:', err);
        res.status(500).json(error);
    }
});

// Route to render a specific user's profile
router.get('/users/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
        });

        if (!userData) {
            res.status(404).send('User not found');
            return;
        }

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

module.exports = router;