const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken.js');
const { SECRET } = require('../constants.js');

exports.findById = async (id) => await User.findOne({ '_id': id });

exports.findByUsername = async (username) => await User.findOne({ username });

exports.findByEmail = async (email) => await User.findOne({ email });

exports.login = async (username, password) => {
    // Check for empty fields
    if (!username || !password) {
        throw new Error('All fields are required');
    }
    // User exists
    const user = await this.findByUsername(username);

    if (!user) {
        throw new Error('Invalid username or password');
    }

    // Password is valid
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
        throw new Error('Invalid username or password');
    }

    // Generate token
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    };

    const token = await jwt.sign(payload, SECRET);

    return token;
}

exports.register = async (username, email, password) => {
    const existingUser = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    });
    
    if (existingUser) {
        throw new Error('User is already registered with the same credentials');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({ username, email, password: hashedPassword });
    } catch (error) {
        throw errorHandler(error);
    }

    const token = this.login(username, password);

    return token;
}

function errorHandler(error) {
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(value => value.message);

        return errors[0];
    } else {
        return error.message;
    }
}