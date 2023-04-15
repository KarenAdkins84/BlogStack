const User = require("../../model/user/User");
const Post = require('../../model/post/Post');
const appErr = require("../../utils/appErr");

//create post
const createPostCtrl = async (req, res, next)=> {
    const { title, description, category, user } = req.body;
    try {
        if(!title || !description || !category || !req.file) {
            return res.render('posts/addPost', { error: 'All fields are required' });
        }
        //find the user
        const userId = req.session.userAuth;
        const userFound = await User.findById(userId);
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
        
        //redirect
        res.redirect('/');
    } catch (error) {
        return res.render('posts/addPost', { error: error.message });
    }
};

//get all posts
const fetchPostsCtrl = async (req, res, next)=> {
    try {
        const posts = await Post.find().populate('comments').populate('user');
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
        const post = await Post.findById(id).populate('comments');
        res.render('posts/postDetails', {
            post,
            error: '',
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
            return res.render('posts/postDetails', {
                error: "You are not authorized to delete this post",
                post,
            });
        }
        //delete post
        await Post.findByIdAndDelete(req.params.id);
        //redirect
        res.redirect('/');
    } catch (error) {
        return res.render('posts/postDetails', {
            error: error.message,
            post: '',
        });
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
};