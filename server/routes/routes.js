const router = require('express').Router();

const authController = require('../controllers/authController.js');
const postsController = require('../controllers/postsController.js');
const profileController = require('../controllers/profileController.js');

router.use(authController);
router.use(postsController);
router.use(profileController);

module.exports = router;