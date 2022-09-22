
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Création d'un compte utilisateur
exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                job: req.body.job,
                profilImage: null
            }        
        );
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
            })
        .catch(error => res.status(400).json({ error }));
};

// Connection user
exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                res.status(400).json({ error: 'Utilisateur non trouvé !  ' })
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        res.status(400).json({ error: 'Mot de passe incorrect' })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }  
                        ) 
                    });
                })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
};

// Récupération des ultilisateurs
exports.users = (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

// Récupération du profil
exports.getMyProfil = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};

// Modification du profil
exports.modifyMyProfil= (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (user) {
                user.updateOne({profilImage: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` })
                    .then(() => res.status(200).json({ message: 'Photo de profil modifiée !' }))
                    .catch(error => res.status(400).json({ error }));
            } else {
                res.status(401).json({ message: 'Requête non autorisée !' });    
            }
        }).catch(error => { console.log(error); res.status(400).json({ error }) });
};

// Supression du profil
exports.deleteMyProfil = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (user._id == userId) {
                User.deleteOne({ _id: req.params.id })     
                    .catch(error => res.status(400).json({ error }));  
            } else {
                res.status(401).json({ message: 'Requête non autorisée !' });
            }
        })
        .then(() => res.status(200).json({ message: 'Profil Supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};