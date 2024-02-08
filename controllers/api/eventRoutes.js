// Imports
const router = require('express').Router();
const { Event, UsersEvents } = require('../../models');
const withAuth = require('../../utils/auth');

// GET route to list events 
router.get('/', async (req, res) => {
    try {
        const eventData = await Event.findAll({
            include: [{ model: UsersEvents }] 
        });
        res.status(200).json(eventData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET route to search by date
router.get('/date', async (req, res) => {
    try {
        const eventData = await Event.findAll({
            where: {
                date: req.query.date // Date is in 'YYYY-MM-DD' format
            }
            // Possibly add other relevant associations and attributes
        });
        res.status(200).json(eventData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route to search by location 
router.get('/location', async (req, res) => {
    try {
        const locationQuery = req.query.location;
        const eventData = await Event.findAll({
            where: {
                location: sequelize.where(sequelize.fn('LOWER', sequelize.col('location')), 'LIKE', '%' + locationQuery.toLowerCase() + '%')
            },
            include: [
                { model: User, attributes: ['name'] },
                { model: Game, attributes: ['title'] }
            ]
        });
        if (eventData.length === 0) {
            res.status(404).json({ message: 'No events found with that location.' });
            return;
        }
        res.status(200).json(eventData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
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