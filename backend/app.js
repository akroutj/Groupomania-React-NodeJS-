
// Récupération du module express
const express = require('express');

// Mise en place de Mongoose
const mongoose = require('mongoose');

// Traitement des requètes vers la route 'images'/ Accès au path de notre serveur
const path = require('path');

// Déclaration de 'app'
const app = express();

// Configuration de dotenv pour le fichier .env
require('dotenv').config();

//Récuperation des routes 
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const commentRoutes = require('./routes/comment')


// Connection à la base de données
mongoose.connect(process.env.SECRET_DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log(err));

// Fonction similaire à bodyParser (extraction du body JSON pour la methode POST)
app.use(express.json());

// Mise en place des headers pour acceder à notre API depuis n'importe quelle origine (CORS)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Gestion de la source 'image' de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes User 
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/comments', commentRoutes);

module.exports = app;

