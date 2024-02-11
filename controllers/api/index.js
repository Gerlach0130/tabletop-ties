// Imports
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gameRoutes = require('./gameRoutes');
const eventRoutes = require('./eventRoutes');

// Route Mounting
router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/events', eventRoutes);

// Export
module.exports = router;