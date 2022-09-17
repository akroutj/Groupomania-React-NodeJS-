
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const messageCtrl = require('../controllers/message');

// CRUD
router.get('/', messageCtrl.getAllMessages);
router.post('/new', auth, multer, messageCtrl.createMessage);
router.put('/:id', auth, multer, messageCtrl.modifyMessage);
router.delete('/:id', auth, messageCtrl.deleteMessage);
router.post('/:id/like', auth, messageCtrl.likeMessage);

module.exports = router;