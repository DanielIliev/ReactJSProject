const { check } = require('express-validator');

// Authentication validators
const usernameValidators =
    check('username')
        .not()
        .isEmpty()
        .withMessage('Username is required!')
        .isLength(
            {
                min: 3,
                max: 25
            }
        )
        .withMessage('Username must be between 3 and 25 characters long!')
        .matches(/^[A-Za-z0-9]+$/)
        .withMessage('Only English letters and numbers are allowed for the username')
        .trim()

const emailValidators =
    check('email')
        .not()
        .isEmpty()
        .withMessage('Email is required!')
        .isEmail()
        .withMessage('Email must be a valid email address!')
        .trim()

const passwordValidators =
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required!')
        .isLength({
            min: 4
        })
        .withMessage('Passwords must be at least 4 characters long!')
        .trim()


const repeatPasswordValidators =
    check('repass')
        .not()
        .isEmpty()
        .withMessage('Repeat password is required!')
        .trim()

const registerValidators = [
    usernameValidators,
    emailValidators,
    passwordValidators,
    repeatPasswordValidators
];

// Content validators
const postValidators = [
    check('title')
        .not()
        .isEmpty()
        .withMessage('Post title is required!')
        .isLength({
            min: 3,
            max: 25
        })
        .withMessage('Post title must be between 3 and 15 characters long!')
        .trim(),

    check('content')
        .not()
        .isEmpty({ ignore_whitespace: false })
        .withMessage('Post content is required!')
        .isLength({
            min: 10,
            max: 350
        })
        .withMessage('Post content must be between 10 and 350 characters long')
        .trim()
];

const commentValidators = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('Unable to add your comment')
        .trim(),
        
    check('comment')
        .not()
        .isEmpty()
        .withMessage('The comment field is required!')
        .isLength({
            max: 350
        })
        .withMessage('Your comment exceeds the maximum length of 350 characters')
        .trim()
];

module.exports = {
    registerValidators,
    postValidators,
    commentValidators
};