const { validationResult } = require('express-validator');
const { postValidators, commentValidators } = require('../middlewares/inputValidators');
const postService = require('../services/postService');
const authorizedUser = require('../middlewares/authorizationMiddleware');
const router = require('express').Router();

// GET requests
router.get('/posts', async (req, res) => {
    try {
        const posts = await postService.fetchPosts();

        return res.json(posts);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'We are unable to fetch posts, please try again later'
        });
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const post = await postService.fetchByIdWithAuthorName(req.params.id);

        return res.json(post);
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: 'We are unable to fetch the post, please try again later'
        });
    }
});

router.get('/delete/:userId/:postId', authorizedUser, async (req, res) => {
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;

        if (req.decoded._id !== userId) {
            return res.status(401).json({
                success: false,
                message: 'You are not the author of this post'
            });
        }

        await postService.deletePost(postId);

        return res.json({
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'We are unable to delete the post, please try again later'
        });
    }
});

// POST requests
router.post('/posts/add', authorizedUser, postValidators, async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await postService.addPost({ ...req.body });

        return res.end();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'We are unable to add your post, please try again later'
        });
    }
});

router.post('/comment', authorizedUser, commentValidators, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const response = await postService.addComment({ ...req.body });

        return res.json(response);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'We are unable to add your comment, please try again later'
        });
    }
});

router.post('/edit/:id', authorizedUser, postValidators, async (req, res) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const post = await postService.fetchById(req.params.id);

        if (req.decoded._id !== String(post.author)) {
            return res.status(401).json({
                success: false,
                message: 'You are not the author of this post'
            });
        }

        await postService.editPost({ ...req.body });
        return res.end();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'We are unable to edit your post, please try again later'
        });
    }
});

module.exports = router;