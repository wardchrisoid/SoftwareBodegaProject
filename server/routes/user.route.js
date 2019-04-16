const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));

router.route('/:id')
  .get(asyncHandler(retreive));

router.route('/:id')
  .post(asyncHandler(updateUser));

async function retreive(req, res) {
  let user = await userCtrl.retreive(req.params.id);
  res.json(user);
}
async function updateUser(req, res) {
  let user = await userCtrl.updateUser(req.params.id, req.body);
  res.json(user);
}
async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}
