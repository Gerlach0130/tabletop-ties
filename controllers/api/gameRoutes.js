// Imports
const router = require('express').Router();
const { User, Game, UsersGames } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// GET route to fetch all games
router.get('/', async (req, res) => {
    try {
        const gameData = await Game.findAll({});
        res.status(200).json(gameData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET route to fetch specific game
router.get('/:id', async (req, res) => {
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

        if (!gameData) {
            res.status(404).json({ message: 'No game found with this id!' });
            return;
        }

        res.status(200).json(gameData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST route to add a new game
router.post('/', withAuth, async (req, res) => {
    try {
        const { title, genre, player_count, avg_play_time, description } = req.body;
        const newGame = await Game.create({
            title,
            genre,
            player_count,
            avg_play_time,
            description
        });
        res.status(201).json(newGame);
    } catch (error) {
        console.error('Failed to add game:', error);
        res.status(500).json({ message: 'Failed to add game', error });
    }
});

// GET route to search by genre  ---- currently not working ----
router.get('/genre/:genre', async (req, res) => {
    try {
        const gamesByGenre = await Game.findAll({
            where: { genre: req.params.genre }
        });
        res.status(200).json(gamesByGenre);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route to search by game title  ---- currently not working ----
router.get('/title/:title', async (req, res) => {
    try {
        const gameData = await Game.findAll({
            where: {
                title: {
                    [sequelize.Op.like]: `%${req.params.title.toLowerCase()}%`
                }
            }
            // Possibly add other relevant associations and attributes
        });
        res.status(200).json(gameData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST route for user to add a game to profile interests ---- currently not working ----
router.post('/add', withAuth, async (req, res) => {
    try {
        const newGameInterest = await UsersGames.create({
            // ...req.body,
            user_id: req.session.user_id,
            game_id: req.body.game_id
        });
        res.status(200).json(newGameInterest);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// Export
module.exports = router;