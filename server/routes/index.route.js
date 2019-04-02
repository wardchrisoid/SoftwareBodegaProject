const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const apiRoutes  = require('./api.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/fridge' , apiRoutes);

module.exports = router;
