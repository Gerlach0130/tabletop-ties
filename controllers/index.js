// Imports
const router = require('express').Router();
const apiRoute = require('./api');
const homeRoute = require('./homeRoutes');

// Routing
router.use('/api', apiRoute);
router.use('/', homeRoute);

// Export
module.exports = router;