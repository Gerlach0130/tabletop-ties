const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gameRoutes = require('./gameRoutes');
const eventRoutes = require('./eventRoutes');

router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/events', eventRoutes);

module.exports = router;