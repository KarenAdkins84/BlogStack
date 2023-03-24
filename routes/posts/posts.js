const express = require('express');
const multer = require('multer');
const storage = require('../../config/coudinary');

const { 
    createPostCtrl, 
    fetchPostsCtrl, 
    singlePostCtrl, 
    deletePostCtrl, 
    updatePostCtrl 
} = require('../../controllers/posts/posts');

const postRoutes = express.Router();
const protected = require('../../middlewares/protected');

//instance of multer
const upload = multer({
    storage,
});

//POST/api/v1/posts
postRoutes.post('/', protected, upload.single('file'), createPostCtrl)

//GET/api/v1/posts
postRoutes.get('/', fetchPostsCtrl)

//GET/api/v1/posts/:id
postRoutes.get('/:id', singlePostCtrl)

//DELETE/api/v1/posts/:id
postRoutes.delete('/:id', protected, deletePostCtrl)

//PUT/api/v1/posts/:id
postRoutes.put('/:id', protected, upload.single('file'),updatePostCtrl);

module.exports = postRoutes;