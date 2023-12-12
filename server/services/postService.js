const Post = require('../models/Post.js');
const authService = require('./authService.js');

exports.fetchPosts = async () => await Post.find().lean();

exports.fetchById = async (id) => await Post.findOne({ '_id': id }).lean();

exports.fetchByIdWithAuthorName = async (id) => {
    const post = await Post.findOne({ '_id': id }).lean();
    const authorId = String(post.author);
    const author = await authService.findById(authorId);

    const data = Object.assign({}, post);
    data.authorName = author.username;

    return data;
}

exports.addPost = async (data) => await Post.create({ ...data });

exports.editPost = async (data) => {
    const { id, title, content } = data;

    await Post.findOneAndUpdate({ '_id': id }, {
        title,
        content
    });
}

exports.deletePost = async (id) => await Post.findOneAndDelete({ '_id': id });

exports.addComment = async (data) => {
    const { id, username, comment } = data;

    await Post.findOneAndUpdate({ '_id': id }, {
        $push: {
            'comments': {
                'username': username,
                'comment': comment
            }
        }
    });

    const post = await this.fetchById(id);

    return post.comments;
}