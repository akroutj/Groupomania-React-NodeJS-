// Importation du package mongoose
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userId: { type: String, require: true },
    messageId: { type: String, require: true },
    commentary: { type: String, require: true },
    name: { type: String, require: true }
});

module.exports = mongoose.model('Comment', commentSchema);