// Imports
const router = require('express').Router();
const { Event, Game, User, UsersEvents, EventsGames } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// GET route to list all events 
router.get('/', async (req, res) => {
    try {
        const eventData = await Event.findAll({
            include: [
                {
                    model: Game,
                    through: EventsGames,
                    as: 'event_games',
                },
                {
                    model: User,
                    through: UsersEvents,
                    as: 'attendees',
                    attributes: ['name'],
                }
            ]
        });
        res.status(200).json(eventData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET route to fetch a specific event by ID
router.get('/:id', async (req, res) => {
    try {
        const eventData = await Event.findByPk(req.params.id, {
            include: [
                {
                    model: Game,
                    through: EventsGames,
                    as: 'event_games',
                },
                {
                    model: User,
                    through: UsersEvents,
                    as: 'attendees',
                    attributes: ['id', 'name'],
                },
            ]
        });

        if (!eventData) {
            res.status(404).json({ message: 'No event found with that ID.' });
            return;
        }

        res.status(200).json(eventData);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json(error);
    }
});

// POST route to create a new event
router.post('/', withAuth, async (req, res) => {
    try {
        const newEvent = await Event.create({
            ...req.body,
            user_id: req.session.user_id 
        });
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Failed to create event:', error);
        res.status(500).json({ message: 'Failed to create event', error: error.toString() });
    }
});

// POST route for user to state interest/attendance in event
router.post('/add', withAuth, async (req, res) => {
    try {
        const eventAttend = await UsersEvents.create({
            ...req.body,
            user_id: req.session.user_id
        });
        console.log(eventAttend);
        res.status(200).json(eventAttend);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// GET route to search by date ---- currently not working ----
router.get('/date/:date_of', async (req, res) => {
    try {
        const eventData = await Event.findAll({
            where: {
                date_of: req.query.date // Date is in 'YYYY-MM-DD' format
            },
            // Possibly add other relevant associations and attributes
            // include: []
        });
        res.status(200).json(eventData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route to search by location  ---- currently not working ----
router.get('/location/:location', async (req, res) => {
    try {
        const eventData = await Event.findAll({
            where: {
                location: sequelize.where(sequelize.fn('LOWER', sequelize.col('location')), 'LIKE', `%${req.query.location.toLowerCase()}%`)
            },
            include: [
                {
                    model: Game,
                    through: EventsGames,
                    as: 'event_games', 
                }
            ]
        });
        res.status(200).json(eventData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Export
module.exports = router;