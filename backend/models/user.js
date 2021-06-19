const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
/**
 * modele users
 * userId :mongodb /string
 * email : string / unique
 * password : string / hachage mdp utilisateur
 * **/


const UserSchema =new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }
);

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);