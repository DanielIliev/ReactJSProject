const jwt = require('jsonwebtoken');
const utils = require('util');

// Transform jwt sign / verify methods from callback based to promise based
exports.sign = utils.promisify(jwt.sign);
exports.verify = utils.promisify(jwt.verify);