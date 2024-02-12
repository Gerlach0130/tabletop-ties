// Imports
const router = require('express').Router();
const { User, Game, UsersGames } = require('../../models');
const { Op } = require("sequelize");
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

// POST route for user to add a game to profile interests 
router.post('/add', withAuth, async (req, res) => {
    try {
        const newGameInterest = await UsersGames.create({
            ...req.body,
            user_id: req.session.user_id
        });
        console.log(newGameInterest);
        res.status(200).json(newGameInterest);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// GET route to search by game title 
router.get('/title/:title', async (req, res) => {
    try {
        console.log(req.params.title);
        const gameData = await Game.findAll({
            where: {
                title: {
                    [Op.like]: `%${req.params.title}`
                }
            }
            // Possibly add other relevant associations and attributes
        });
        
        res.status(200).json(gameData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
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

// Export
module.exports = router;