// Models
const { Comment } = require('../models/comments.model');
const { User } = require('../models/user.model');

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { status: 'active' },
            include: [{ model: User }]
        });
 
		res.status(200).json({
			status: 'success',
			data: { comments: comments },
		});
         
    } catch (error) {
        console.log(error);
    }
};

exports.getCommentById = async (req, res) => {
    try {
        
        const { id } = req.params;

        const comment = await Comment.findOne({
            where: { 
                id: id,
                status: 'active'
        }}); 

        if (!comment) {
            res.status(404).json({
                status: 'Error',
                message: 'No post found with the given id'
            });
            return;
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                post: post,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

exports.createComment = async (req, res) => {
    try {
        
        const { text, userId, postId } = req.body;
    
       const newComment = await Comment.create({ 
            text: text,
            userId: userId,
            postId: postId,
        });
    
        res.status(201).json({ 
            status: 'success',
            data: { newComment }, 
        })

    } catch (error) {
        console.log(error);
    }
};