const User = require('../models/User.js');
const Post = require('../models/Post.js');

exports.getProfilePosts = async (id) => {
    const data = await Post.find({ author: id }).lean();

    return data;
};
