// Imports
const router = require('express').Router();
const { Event, UsersEvents } = require('../../models');
const withAuth = require('../../utils/auth');

// GET route to list events 
router.get('/', async (req, res) => {
    try {
        const eventData = await Event.findAll({
            include: [{ model: User }]
        });
        res.status(200).json(eventData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// POST route to create a new event
router.post('/create', withAuth, async (req, res) => {
    try {
        const newEvent = await Event.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(newEvent);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Exports 
module.exports = router;