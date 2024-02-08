// Imports
const router = require('express').Router();
const { Game, UsersGames } = require('../../models');
const withAuth = require('../../utils/auth');

// GET route to fetch all games
router.get('/', async (req, res) => {
    try {
        const gameData = await Game.findAll();
        res.status(200).json(gameData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET route to fetch specific game

// GET route to fetch games by genre
router.get('/genre/:genre', async (req, res) => {
    try {
        const gameByGenre = await Game.findAll({
            where: { genre: req.params.genre }
        });
        res.status(200).json(gameByGenre);
    } catch (error) {
        res.status(500).json(error);
    }
});

// POST route for user to add a game to profile interests **********POSSIBLY CHANGE /ADD TO JUST / IF ERRORS
router.post('/add', withAuth, async (req, res) => {
    try {
        const newGameInterest = await UsersGames.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(newGameInterest);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Export
module.exports = router;