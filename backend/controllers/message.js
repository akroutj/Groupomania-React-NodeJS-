
const Message = require('../models/Message');
const Comment = require('../models/Comment');

// Récuperation du package FileSystem
const fs = require('fs');

// Récupération de toutes les messages
exports.getAllMessages = (req, res, next) => {
     Message.find().sort({date: -1})
    .then(messages => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error }));
};

// Création d'un message
exports.createMessage = (req, res) => {
    const message = new Message({
        ...req.body,
        imageUrl: req.file !== undefined ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null, 
    });
    message.save()
        .then(() => res.status(201).json({ message: 'Votre post est en ligne !' }))
        .catch(error => res.status(400).json({ error }));
};

// Modification d'un message
exports.modifyMessage = (req, res) => {
    Message.updateOne(
        { _id: req.params.id },
         { $set:
             {
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,  
                message: req.body.message  
            }
        }
        )
        .then(() => 
            res.status(201).json({ message: 'Post modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

// Suppression d'un message
exports.deleteMessage = (req, res) => {
    Message.findOne({ _id: req.params.id })
        .then(message => {
                const filename = message.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Message.deleteOne({ _id: req.params.id })
                        .then(() => Comment.deleteMany({ messageId: req.params.id }))
                        .then(() =>  res.status(200).json({ message: 'Post supprimée !' }))
                        .catch(error => res.status(400).json({ error }));
                });
        })
        .catch(error => res.status(500).json({ error }));
};

// Likes & Dislikes
exports.likeMessage = (req, res) => {

    let like = req.body.like;
    let userId = req.body.userId;
    let messageId = req.params.id;

    // Like
    if (like == 1) {
        Message.findOne({ _id: messageId })
            .then((message) => {
                if (!message.usersLiked.includes(userId)) {
                    Message.updateOne(
                        { _id: messageId },
                        {
                            $inc: { likes: 1 },
                            $push: { usersLiked: userId }
                        }
                    )
                        .then(() => res.status(201).json({ message: 'Vous avez aimé ce post!' }))
                        .catch((error) => res.status(400).json({ error }));
                }
            })
            .catch((error) => res.status(400).json({ error }));
    }

    // Annulation Like 
    if (like === 0) {
        Message.findOne({ _id: messageId })
            .then((message) => {
                if (message.usersLiked.includes(userId)) {
                    Message.updateOne(
                        { _id: messageId },
                        {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: userId }
                        }
                    )
                        .then(() => res.status(201).json({ message: 'Votre avez retiré votre Like' }))
                        .catch((error) => res.status(400).json({ error }));
                }
            })
            .catch((error) => res.status(400).json({ error }));
    }
};
