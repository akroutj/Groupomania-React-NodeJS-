// Importation du package mongoose
const mongoose = require('mongoose');

// Unicité de l'adresse mail de l'utilisateur via 'mongoose-unique-validator'
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name: { type: String, require: true, unique: true},
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    job: { type: String, require: true },
    profilImage: { type: String, require: true },
    admin: {type: Boolean }
});

// Application du plugin sur le userShema
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
