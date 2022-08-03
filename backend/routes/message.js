
const express = require('express');

// Mise en place du router
const router = express.Router();

// Mise en place d'un middleware d'authentification
const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

// Récupération des controllers sauces
const messageCtrl = require('../controllers/message');

// CRUD
router.get('/', messageCtrl.getAllMessages);
router.post('/new', auth, multer, messageCtrl.createMessage);
router.put('/:id', auth, multer, messageCtrl.modifyMessage);
router.delete('/:id', auth, messageCtrl.deleteMessage);
router.post('/:id/like', auth, messageCtrl.likeMessage);

module.exports = router;