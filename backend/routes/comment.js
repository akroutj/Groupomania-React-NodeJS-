const express = require('express');

const router = express.Router();

// Mise en place d'un middleware d'authentification
const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

// Routes
router.get('/', commentCtrl.getAllComments);
router.get('/:commentId', commentCtrl.getCommentsByMessage);
router.post('/', auth, commentCtrl.createComment);
router.delete('/:commentId', auth, commentCtrl.deleteComment);

module.exports = router;

