const Comment = require("../models/Comment");
const Message = require('../models/Message');
const jwt = require('jsonwebtoken');

// logique métier : lire tous les commentaires
exports.getAllComments = (req, res, next) => {
 Comment.find()
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(400).json({ error }));
};

exports.getCommentsByMessage = (req, res, next) => {
  Comment.find({
   "messageId": req.params.articleId
 })
    .then(messages => res.status(200).json(messages ))
    .catch(error => res.status(400).json({ error }));
  };

// logique métier : créer un commentaire
exports.createComment = (req, res, next) => {
  console.log(req.body)
  const comment = new Comment({
    commentary: req.body.commentary,
    userId: req.body.userId,
    messageId: req.body.messageId,
    name: req.body.name
  });
  // Enregistrement de l'objet commentaire dans la base de données
  comment.save()
    .then(() => res.status(201).json({ message: 'Votre commentaire est en ligne !' }))
    .catch(error => res.status(400).json({ error }));
}




