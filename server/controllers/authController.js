const router = require('express').Router();
const { validationResult } = require('express-validator');
const { registerValidators } = require('../middlewares/inputValidators.js');
const authService = require('../services/authService.js');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authService.login(username, password);

        return res.json(token);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

router.post('/register', registerValidators, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (req.body.password !== req.body.repass) {
        return res.status(400).json({
            success: false,
            message: 'Passwords must match!'
        });
    }

    try {
        const { username, email, password} = req.body;

        const token = await authService.register(username, email, password);

        return res.json(token);

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/logout', (req, res) => {
    res.end();
});

module.exports = router;