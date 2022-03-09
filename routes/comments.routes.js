// Define the following endpoints

// GET - Get all comments ( include the user info )
// GET - Get comment by Id
// POST - Create new comment ( text, userId, postId )

const express = require('express');

// Controllers
const { 
    getAllComments, 
    getCommentById, 
    createComment 
} = require('../controllers/comments.controller');

const router = express.Router();

// GET - Get all comments ( include the user info )
router.get('/', getAllComments);

// GET - Get comment by Id
router.get('/:id', getCommentById);

// POST - Create new comment ( text, userId, postId )
router.post('/', createComment);

module.exports = { commentsRouter: router };