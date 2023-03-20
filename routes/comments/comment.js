const express = require('express');
const { createCommentCtrl, 
    fetchCommentsCtrl, 
    singleCommentCtrl, 
    deleteCommentCtrl, 
    updateCommentCtrl } = require('../../controllers/comments/comments');
    
const commentRoutes = express.Router();

commentRoutes.post('/', createCommentCtrl);

//GET/api/v1/comments
commentRoutes.get('/', fetchCommentsCtrl);

//GET/api/v1/comments/:id
commentRoutes.get('/:id', singleCommentCtrl);

//DELETE/api/v1/comments/:id
commentRoutes.delete('/:id', deleteCommentCtrl);

//PUT/api/v1/comments/:id
commentRoutes.put('/:id', updateCommentCtrl);

module.exports = commentRoutes;