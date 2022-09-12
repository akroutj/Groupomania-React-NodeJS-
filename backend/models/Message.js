// Importation du package mongoose
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    userId: { type: String, require: true },
    name: { type: String, require: true },
    job: { type: String, require: true },
    imageUrl: { type: String },
    message: { type: String, require: true },
    likes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    date: { type: Date }
});

module.exports = mongoose.model('Message', messageSchema);