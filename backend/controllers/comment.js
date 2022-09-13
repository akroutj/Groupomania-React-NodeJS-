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
  console.log(req.params)
  Comment.find({
   "messageId": req.params.commentId
 })
    .then(messages => res.status(200).json(messages ))
    .catch(error => res.status(400).json({ error }));
  };

// logique métier : créer un commentaire
exports.createComment = (req, res, next) => {
  
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

// exports.deleteComment = (req, res) => {  
//   Comment.findOne({ _id: req.params.commentId })
//     .then((comment) => { 
//         console.log(comment)
//         Comment.deleteOne({ _id: req.params.id })
//            .then(() =>  res.status(200).json({ message: 'Commentaire supprimé !' }))
//            .catch(error => res.status(400).json({ error }));       
//       })
//     .catch(error => res.status(400).json({ error: 'errooooooor !!'}));
// };

exports.deleteComment = (req, res) => {
  
 console.log(req.params)
 
  Comment.deleteOne({ _id: req.params.commentId })
           .then(() =>  res.status(200).json({ message: 'Commentaire supprimé !' }))
           .catch(error => res.status(400).json({ error }));       
      
  
};








