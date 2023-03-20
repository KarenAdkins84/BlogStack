//create post
const createPostCtrl = async (req, res)=> {
    try {
        res.json({
            status: 'success',
            user: 'Post created'
        });
    } catch (error) {
        res.json(error);
    }
};

//get all posts
const fetchPostsCtrl = async (req, res)=> {
    try {
        res.json({
            status: 'success',
            user: 'Post list'
        });
    } catch (error) {
        res.json(error);
    }
};

//get post by id
const singlePostCtrl = async (req, res)=> {
    try {
        res.json({
            status: 'success',
            user: 'Post details'
        });
    } catch (error) {
        res.json(error);
    }
};

//delete
const deletePostCtrl = async (req, res)=> {
    try {
        res.json({
            status: 'success',
            user: 'Post deleted'
        });
    } catch (error) {
        res.json(error);
    }
};

//update
const updatePostCtrl = async (req, res)=> {
    try {
        res.json({
            status: 'success',
            user: 'Post updated'
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