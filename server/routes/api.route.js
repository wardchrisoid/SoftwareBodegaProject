const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const apiCtrl = require('../controllers/api.controller');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.get('/', retrieve);


async function retrieve(req, res) {
  let fridge = await apiCtrl.fridge();
  res.json(fridge);
}
