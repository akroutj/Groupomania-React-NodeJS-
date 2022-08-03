// Importation du package mongoose
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    userId: { type: String, require: true },
    name: { type: String, require: true },
    job: { type: String, require: true },
    imageUrl: { type: String, require: true },
    commentary: { type: String, require: true }
});

module.exports = mongoose.model('Comment', commentSchema);