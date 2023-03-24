const User = require("../../model/user/User");
const Post = require('../../model/post/Post');
const appErr = require("../../utils/appErr");

//create post
const createPostCtrl = async (req, res, next)=> {
    const { title, description, category, user } = req.body;
    try {
        if(!title || !description || !category || !req.file) {
            return next(appErr('All fields are required'));
        }
        //find the user
        const userId = req.session.userAuth;
        const userFound = await User.findById(userId);
        console.log(userId);
        //create post
        const postCreated = await Post.create({
            title,
            description,
            category,
            user: userFound._id,
            image: req.file.path,
        });
        //push created-post into array of the user's posts
        userFound.posts.push(postCreated._id);
        //resave updated user info
        await userFound.save();
        res.json({
            status: 'success',
            data: postCreated,
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

//get all posts
const fetchPostsCtrl = async (req, res, next)=> {
    try {
        const posts = await Post.find();
        res.json({
            status: 'success',
            data: posts,
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

//details
const singlePostCtrl = async (req, res, next)=> {
    try {
        //get the id from params
        const id = req.params.id;
        //find the post
        const post = await Post.findById(id);
        res.json({
            status: 'success',
            data: post,
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

//delete
const deletePostCtrl = async (req, res, next)=> {
    try {
        //find post
        const post = await Post.findById(req.params.id);
        //check if post belongs to user
        if(post.user.toString() !== req.session.userAuth.toString()) {
            return next(appErr('You are not allowed to delete this post', 403));
        }
        //delete post
        const deletePost = await Post.findByIdAndDelete(req.params.id);
        res.json({
            status: 'success',
            data: 'Post has been successfully deleted'
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

//update
const updatePostCtrl = async (req, res, next)=> {
    const { title, description, category } = req.body;
    try {
        //find post
        const post = await Post.findById(req.params.id);
        //check if post belongs to user
        if(post.user.toString() !== req.session.userAuth.toString()) {
            return next(appErr('You are not allowed to update this post', 403));
        }
        //update
        const postUpdated = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                category,
                image: req.file.path,
            },
            {
                new: true,
            },
        );
        res.json({
            status: 'success',
            data: postUpdated,
        });
    } catch (error) {
        res.json(error);
    }
};


module.exports = { createPostCtrl, 
    fetchPostsCtrl,
    singlePostCtrl,
    deletePostCtrl,
    updatePostCtrl
}