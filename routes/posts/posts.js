const express = require('express');
const { createPostCtrl, fetchPostsCtrl, singlePostCtrl, deletePostCtrl, updatePostCtrl } = require('../../controllers/posts/posts');

const postRoutes = express.Router();

postRoutes.post('/', createPostCtrl)

//GET/api/v1/posts
postRoutes.get('/', fetchPostsCtrl)

//GET/api/v1/posts/:id
postRoutes.get('/:id', singlePostCtrl)

//DELETE/api/v1/posts/:id
postRoutes.delete('/:id', deletePostCtrl)

//PUT/api/v1/posts/:id
postRoutes.put('/:id', updatePostCtrl);

module.exports = postRoutes;