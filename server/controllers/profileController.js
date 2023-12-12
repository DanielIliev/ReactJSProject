const router = require('express').Router();
const authorizedUser = require('../middlewares/authorizationMiddleware.js');
const profileService = require('../services/profileService.js');

// TODO: Add authorizedUser middle
router.get('/profile/:id', authorizedUser, async (req, res) => {
    try {
        const data = await profileService.getProfilePosts(req.params.id);

        return res.json(data);
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: 'We are unable to fetch your posts, please try again later'
        });
    }
});

module.exports = router;