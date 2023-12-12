const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'All fields are required']
    },
    content: {
        type: String,
        required: [true, 'All fields are required']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            username: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Post', postSchema);