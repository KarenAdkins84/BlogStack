const express = require('express');

const commentRoutes = express.Router();

commentRoutes.post('/', async (req, res)=> {
    try {
        res.json({
            status: 'success',
            user: 'Comment created'
        });
    } catch (error) {
        res.json(error);
    }
});

//GET/api/v1/comments
commentRoutes.get('/', async (req, res)=> {
    try {
        res.json({
            status: 'success',
            user: 'Comment list'
        });
    } catch (error) {
        res.json(error);
    }
});

//GET/api/v1/comments/:id
commentRoutes.get('/:id', async (req, res)=> {
    try {
        res.json({
            status: 'success',
            user: 'Comment details'
        });
    } catch (error) {
        res.json(error);
    }
});

//DELETE/api/v1/comments/:id
commentRoutes.delete('/:id', async (req, res)=> {
    try {
        res.json({
            status: 'success',
            user: 'Comment deleted'
        });
    } catch (error) {
        res.json(error);
    }
});

//PUT/api/v1/comments/:id
commentRoutes.put('/:id', async (req, res)=> {
    try {
        res.json({
            status: 'success',
            user: 'Comment updated'
        });
    } catch (error) {
        res.json(error);
    }
});

module.exports = commentRoutes;