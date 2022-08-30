const express = require('express');

// Mise en place du router
const router = express.Router();

// Récupération des logiques metier user
const userCtrl = require('../controllers/user');

const multer = require('../middleware/multer-config');

const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/users', userCtrl.users)
router.get('/profil/:id', userCtrl.getMyProfil)
router.put('/profil/:id', auth, multer, userCtrl.modifyMyProfil)
router.delete('/profil/:id', userCtrl.deleteMyProfil)

module.exports = router;

