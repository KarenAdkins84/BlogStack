const Post = require('../../model/post/Post');
const User = require('../../model/user/User');
const Comment = require('../../model/comment/Comment');
const appErr = require('../../utils/appErr')

//create comment
const createCommentCtrl = async (req, res, next)=> {
    const { message } = req.body;
    try {
        //find post
        const post = await Post.findById(req.params.id);
        //create the comment
        const comment = await Comment.create({
            user: req.session.userAuth,
            message,
        });
        //push the comment to the post
        post.comments.push(comment._id);
        //find the user
        const user = await User.findById(req.session.userAuth);
        //push the comment into user array
        user.comments.push(comment._id);
        //disable validation
        //save
        await post.save({ validationBeforeSave: false });
        await user.save({ validationBeforeSave: false });

        res.json({
            status: 'success',
            data: comment,
        });
    } catch (error) {
        next(appErr(error));
    }
};

//single
const commentDetailsCtrl = async (req, res, next)=> {
    try {
        res.json({
            status: 'success',
            user: 'Comment details'
        });
    } catch (error) {
        next(appErr(error));
    }
};

//delete
const deleteCommentCtrl = async (req, res, next)=> {
    try {
        //find comment
        const comment = await Comment.findById(req.params.id);
        //check if comment belongs to user
        if(comment.user.toString() !== req.session.userAuth.toString()) {
            return next(appErr('You are not allowed to delete this comment', 403));
        }
        //delete comment
        await Comment.findByIdAndDelete(req.params.id);
        res.json({
            status: 'success',
            data: 'Comment has been successfully deleted'
        });
    } catch (error) {
        next(appErr(error));
    }
};

//update
const updateCommentCtrl = async (req, res, next)=> {
    try {
        //find comment
        const comment = await Comment.findById(req.params.id);
        
        if(!comment){
            return next(appErr('Comment not found'));
        }
        //check if comment belongs to user
        if(comment.user.toString() !== req.session.userAuth.toString()) {
            return next(appErr('You are not allowed to update this comment', 403));
        }
        //update
        const commentUpdated = await Comment.findByIdAndUpdate(
            req.params.id,
            {
                message: req.body.message,
            },
            {
                new: true,
            },
        );
        res.json({
            status: 'success',
            data: commentUpdated,
        });
    } catch (error) {
        next(appErr(error.message));
    }
};

module.exports = { 
    createCommentCtrl,  
    commentDetailsCtrl,
    deleteCommentCtrl,
    updateCommentCtrl,
}