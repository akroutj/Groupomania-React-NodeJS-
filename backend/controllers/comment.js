
const Comment = require("../models/Comment");

// Récupération de tout les commentaires
exports.getAllComments = (req, res, next) => {

 Comment.find()
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(400).json({ error }));
};

// Récupération d'un commentaire
exports.getCommentsByMessage = (req, res, next) => {

  Comment.find({
   "messageId": req.params.commentId
 })
    .then(messages => res.status(200).json(messages ))
    .catch(error => res.status(400).json({ error }));
  };

// Création d'un commentaire
exports.createComment = (req, res, next) => {

  const comment = new Comment({
    commentary: req.body.commentary,
    userId: req.body.userId,
    messageId: req.body.messageId,
    name: req.body.name
  });
  comment.save()
    .then(() => res.status(201).json({ message: 'Votre commentaire est en ligne !' }))
    .catch(error => res.status(400).json({ error }));
}

// Suppréssion d'un commentaire
exports.deleteComment = (req, res) => {

  Comment.deleteOne({ _id: req.params.commentId })
           .then(() =>  res.status(200).json({ message: 'Commentaire supprimé !' }))
           .catch(error => res.status(400).json({ error }));       
};








