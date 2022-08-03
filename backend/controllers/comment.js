const Comment = require("../models/Comment");
const jwt = require('jsonwebtoken');

// logique métier : lire tous les commentaires
exports.getAllComments = (req, res, next) => {
 Comment.find()
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(400).json({ error }));
};


// logique métier : créer un commentaire
exports.createComment = (req, res, next) => {
  const commentObject = req.body.comment;
  const comment = new Comment({
    ...commentObject
  });
  // Enregistrement de l'objet commentaire dans la base de données
  comment.save()
    .then(() => res.status(201).json({ message: 'Votre commentaire est en ligne !' }))
    .catch(error => res.status(400).json({ error }));
}

