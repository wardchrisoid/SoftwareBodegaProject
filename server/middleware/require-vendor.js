const httpError = require('http-errors');

const requireVendor = function (req, res, next) {
  if (req.user && req.user.roles.indexOf('vendor') > -1) 
    return next();
  const err = new httpError(401);
  return next(err);
}

module.exports = requireVendor;
